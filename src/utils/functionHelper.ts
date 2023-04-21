class FunctionHelper {
  public setEmptyToUndefined = (obj: any) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const element = obj[key];
        if (element === "" || element === null || element === 0) {
          obj[key] = undefined;
        }
      }
    }
    return obj;
  }
}

export default new FunctionHelper();