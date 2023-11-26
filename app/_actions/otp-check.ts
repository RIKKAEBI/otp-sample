"use server"

import speakeasy from 'speakeasy'

export const checkAction = (formData: FormData) => {
    const verified = speakeasy.totp.verify({
        secret: formData.get('key') as string,
        encoding: 'base32',
        token: formData.get('otp') as string
    });

    return verified
}