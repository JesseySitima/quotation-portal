export interface QuotationFormValues {
  facilityName: string;
  contactPerson: string;
  email: string;
  phone: string;
}

export interface QuotationFormErrors {
  facilityName?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  items?: string;
}

export function validateQuotationForm(
  values: QuotationFormValues,
  itemCount: number,
): QuotationFormErrors {
  const errors: QuotationFormErrors = {};

  if (!values.facilityName.trim()) {
    errors.facilityName = "Facility / Company is required.";
  }

  if (!values.contactPerson.trim()) {
    errors.contactPerson = "Contact person is required.";
  }

 if (
  values.email.trim() &&
  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
) {
  errors.email = "Please enter a valid email address.";
}

  if (!values.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (values.phone.trim().length < 7) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (itemCount === 0) {
    errors.items = "Please add at least one product to your request.";
  }

  return errors;
}