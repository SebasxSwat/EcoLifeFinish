from flask import Blueprint, render_template, request
from app import db  
from app.models.huellaCarbono import HuellaCarbono  
from app.models.user import Usuario  

bp = Blueprint('HuellaCarbono', __name__)

# Factores de emisión
FACTORES_EMISION = {
    'transporte': {
        'coche': 0.21,
        'autobus': 0.1,
        'moto': 0.15  
    },
    'energia': {
        'electricidad': 0.5,
        'gas_natural': 2.1
    },
    'consumo': {
        'electronica': 0.01  
    }
}


HUELLA_PROMEDIO_MENSUAL = 369

class HuellaCarbonoCalculator:
    def __init__(self, transporte_data, energia_data, consumo_data):
        self.transporte_data = transporte_data
        self.energia_data = energia_data
        self.consumo_data = consumo_data

    def calcular_transporte(self):
        emisiones_transporte = self.transporte_data['distancia'] * self.transporte_data['factor_emision']
        return round(emisiones_transporte, 2)

    def calcular_energia(self):
        emisiones_electricidad = self.energia_data['electricidad'] * FACTORES_EMISION['energia']['electricidad']
        emisiones_gas_natural = self.energia_data['gas_natural'] * FACTORES_EMISION['energia']['gas_natural']
        return round(emisiones_electricidad + emisiones_gas_natural, 2)

    def calcular_consumo(self):
        dispositivos_electronicos = self.consumo_data['dispositivos_electronicos']
        emisiones_electronica = dispositivos_electronicos * FACTORES_EMISION['consumo']['electronica']
        return round(emisiones_electronica, 2)

    def calcular_huella_total(self):
        huella_transporte_diaria = self.calcular_transporte()
        huella_energia_diaria = self.calcular_energia()
        huella_consumo_diaria = self.calcular_consumo()

        huella_total_diaria = huella_transporte_diaria + huella_energia_diaria + huella_consumo_diaria
        huella_total_mensual = round(huella_total_diaria * 30, 2)  # Redondear a dos decimales

        return {
            'diaria': huella_total_diaria,
            'mensual': huella_total_mensual
        }

    def calcular_porcentaje(self, huella_total_mensual, promedio_mensual):
        return round((huella_total_mensual / promedio_mensual) * 100, 2)

@bp.route('/HuellaCarbono', methods=['GET', 'POST'])
def calcular_huella():
    if request.method == 'POST':
        transporte_tipo = request.form.get('transporte_tipo')
        transporte_data = {
            'distancia': float(request.form.get('transporte_distancia', 0)),
            'factor_emision': FACTORES_EMISION['transporte'][transporte_tipo]
        }
        
        energia_data = {
            'electricidad': float(request.form.get('electricidad', 0)),
            'gas_natural': float(request.form.get('gas_natural', 0))
        }
        
        consumo_data = {
            'dispositivos_electronicos': float(request.form.get('dispositivos_electronicos', 0))
        }

        calculador = HuellaCarbonoCalculator(transporte_data, energia_data, consumo_data)
        huella_totales = calculador.calcular_huella_total()

        porcentaje_mensual = calculador.calcular_porcentaje(huella_totales['mensual'], HUELLA_PROMEDIO_MENSUAL)

        estado_mensual = 'por encima' if huella_totales['mensual'] > HUELLA_PROMEDIO_MENSUAL else 'por debajo'

        usuario_actual = Usuario.query.first() 

        nueva_huella = HuellaCarbono(
            usuario_id=usuario_actual.id,
            transporte_tipo=transporte_tipo,
            distancia_transporte=transporte_data['distancia'],
            emisiones_transporte=huella_totales['diaria'],
            consumo_electricidad=energia_data['electricidad'],
            consumo_gas_natural=energia_data['gas_natural'],
            emisiones_energia=calculador.calcular_energia(),
            dispositivos_electronicos=consumo_data['dispositivos_electronicos'],
            emisiones_electronica=calculador.calcular_consumo(),
            huella_total_diaria=huella_totales['diaria'],
            huella_total_mensual=huella_totales['mensual'],
            porcentaje_mensual=porcentaje_mensual,
            estado_mensual=estado_mensual
        )

        db.session.add(nueva_huella)
        db.session.commit()

        return render_template('resultados.html', 
                               huella_mensual=huella_totales['mensual'], 
                               porcentaje_mensual=porcentaje_mensual,
                               estado_mensual=estado_mensual)

    return render_template('huella.html')
