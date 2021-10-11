const getNameAlias = (name: string): string | void => {
  if (name) {
    if (name.indexOf(" ") >= 0) {
      const splitted = name.split(" ");
      const [first, ...rest] = splitted;
      const second = rest[rest.length - 1];
      return first[0] + second[0];
    }
    return name[0];
  }
};

export default getNameAlias;
