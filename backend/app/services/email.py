import resend

from app.config import settings


resend.api_key = settings.resend_api_key


def send_quotation_email(quotation, items):
    items_html = ""

    for item in items:
        items_html += f"""
        <tr>
            <td>{item["product_name"]}</td>
            <td>{item["quantity"]}</td>
            <td>{item["unit"]}</td>
        </tr>
        """

    html = f"""
    <html>
        <body>
            <h2>New Quotation Request</h2>

            <p>
                <strong>Request Number:</strong>
                {quotation["request_number"]}
            </p>

            <h3>Customer Details</h3>

            <p>
                <strong>Facility:</strong>
                {quotation["facility_name"]}
            </p>

            <p>
                <strong>Contact Person:</strong>
                {quotation["contact_person"]}
            </p>

            <p>
                <strong>Email:</strong>
                {quotation["email"]}
            </p>

            <p>
                <strong>Phone:</strong>
                {quotation["phone"]}
            </p>

            <h3>Requested Products</h3>

            <table border="1" cellpadding="8" cellspacing="0">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                    </tr>
                </thead>

                <tbody>
                    {items_html}
                </tbody>
            </table>

            <h3>Notes</h3>

            <p>
                {quotation["notes"] or "No notes provided."}
            </p>
        </body>
    </html>
    """

    return resend.Emails.send({
        "from": "Quotation Portal <onboarding@resend.dev>",
        "to": [settings.quotation_email],
        "subject": f"New Quotation Request - {quotation['request_number']}",
        "html": html,
    })