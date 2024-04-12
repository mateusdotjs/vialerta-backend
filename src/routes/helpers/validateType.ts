export function validateType(type: string) {
  const types = [
    "Velocidade reduzida",
    "Paralisada - falha nos trens",
    "Greve",
    "Todas",
  ];

  const validation = types.includes(type);

  return validation;
}
