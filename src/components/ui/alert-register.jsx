import React from 'react';
import { Alert } from "@/components/ui/alert";

export const SuccessAlert = ({ message }) => {
  return (
    <Alert variant="destructive" className="mt-4">
      <div>{message}</div>
    </Alert>
  );
};

export const ErrorAlert = ({ message }) => {
  return (
    <Alert variant="default" className="mt-4 text-grenn-600">
      <div>{message}</div>
    </Alert>
  );
};