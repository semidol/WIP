export function checkPass(pass: string | undefined) {
  let message: boolean | string = false;
  if (pass) {
    if (pass.length < 8) {return message = 'Пароль должен быть минимум 8 символов'}
    if (pass === pass.toLowerCase()) {return message = 'Пароль должен включать минимум 1 заглавную букву'}
    if (!/\d/.test(pass)) {return message = 'Пароль должен включать минимум 1 цифру'}
  } 
  return message
}