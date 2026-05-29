/**
 * Calcula edad a partir de un string "DD-MM-YYYY" (formato de la API /user).
 * `now` se puede inyectar para tests.
 */
export function calcAge(birthDay: string, now: Date = new Date()): number {
  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(birthDay);
  if (!match) {
    throw new Error(`birthDay inválido: "${birthDay}". Esperado DD-MM-YYYY.`);
  }
  const dd = Number(match[1]);
  const mm = Number(match[2]);
  const yyyy = Number(match[3]);
  if (mm < 1 || mm > 12 || dd < 1 || dd > 31) {
    throw new Error(`birthDay fuera de rango: "${birthDay}".`);
  }

  const birth = new Date(yyyy, mm - 1, dd);
  let age = now.getFullYear() - birth.getFullYear();

  const beforeBirthday =
    now.getMonth() < birth.getMonth() ||
    (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate());

  return beforeBirthday ? age - 1 : age;
}
