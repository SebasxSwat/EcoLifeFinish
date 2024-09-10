from flask import Blueprint, render_template, redirect, url_for, request, flash
from flask_login import login_user, logout_user, login_required, current_user
from app.models.user import Usuario

bp = Blueprint('auth', __name__)

@bp.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        nombre = request.form['nombre']
        email = request.form['email']
        password = request.form['password']
        

        user = Usuario.query.filter_by(nombre=nombre, email=email, password=password).first()

        if user:
            login_user(user)
            flash("Login successful!", "success")
            return redirect(url_for('home.index'))
        
        flash('Invalid credentials. Please try again.', 'danger')
    
    if current_user.is_authenticated:
        return redirect(url_for('home.index'))
    return render_template("login.html")

@bp.route('/dashboard')
@login_required
def dashboard():
    return f'Welcome, {current_user.nombre}! This is your dashboard.'

@bp.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out.', 'info')
    return redirect(url_for('auth.login'))
