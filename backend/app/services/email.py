import resend

from app.config import settings


resend.api_key = settings.resend_api_key


def send_test_email():
    response = resend.Emails.send({
        "from": "Quotation Portal <onboarding@resend.dev>",
        "to": [settings.quotation_email],
        "subject": "Quotation Portal Email Test",
        "html": """
        <h2>Quotation Portal</h2>
        <p>This is a test email from the quotation portal.</p>
        <p>Email sending is working successfully.</p>
        """,
    })

    return response