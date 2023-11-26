import speakeasy from 'speakeasy'
import qrcode from 'qrcode'
import { checkAction } from './_actions/otp-check';

export default async function Home() {
  const key = speakeasy.generateSecret({ length: 100 })

  const url = new Promise<string>((resolve) => {
    qrcode.toDataURL(key.otpauth_url!, (_, qrcode) => resolve(qrcode))
  })

  return (
    <main>
      <form action={checkAction} className='flex flex-col mx-auto space-y-8 w-96'>
        <h1 className='text-2xl text-center mt-8'>One Time Password Authenticator</h1>
        <img src={`${await url}`} alt="qr" />
        <div className='w-full'>
          <label className="label">
            <span className="label-text">ワンタイムパスワード</span>
          </label>
          <input type="text" name="otp" className='input w-full' placeholder='000000'/>
        </div>
        <div className='w-full'>
          <label className="label">
            <span className="label-text">シークレットキー <br />※実際は漏洩しないようにサーバーに保管する</span>
          </label>
          <textarea name="key" rows={5} defaultValue={key.base32} readOnly className='w-full outline-none resize-none' />
        </div>
        <button type="submit" className='btn'>認証</button>
      </form>
    </main>
  )
}
