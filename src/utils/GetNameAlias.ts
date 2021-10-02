const getNameAlias = (name: string): string => {
  const splitted = name.split(" ");
  const [first, ...rest] = splitted;
  const second = rest[rest.length - 1];
  return first[0] + second[0];
};

export default getNameAlias;
