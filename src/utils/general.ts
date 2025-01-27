export function truncateString(str: string, length: number): string {
  if (str.length > length) {
    return str.slice(0, length) + "...";
  }
  return str;
}

export const algorithmMapping = {
  skhe: "Single Key homomorphic encryption",
  phe: "Partial Homomorphic encryption",
  fhe: "Fully homomorphic encryption",
  mkhe: "Multi key homomorphic encryption",
} as const;

export type AlgorithmShortForm = keyof typeof algorithmMapping;

export const expandName = (shortForm: AlgorithmShortForm): string => {
  return algorithmMapping[shortForm];
};
