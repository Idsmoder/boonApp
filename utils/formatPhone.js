export default function formatPhone(phone) {
    if (typeof phone !== 'string') {
        phone = phone.toString();
    }
    return phone.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '+$1 $2 $3 $4 $5');
}

export function cleanPhoneNumber(phoneNumber) {
    return phoneNumber.replace(/[\s()+-]/g, '').slice(3);
}
