export class LocalFilter {

  protected static FILTER = (value: string, search: string) => {
    return value.toString().toLowerCase().includes(search.toString().toLowerCase());
  };

  static filter(data: Array<any>, field: string, search: string, customFilter?: Function): Array<any> {
    let filter: Function = customFilter ? customFilter : this.FILTER;

    return data.filter((el) => {
      let value = typeof el[field] === 'undefined' || el[field] === null ? '' : el[field];
      return filter.call(null, value, search);
    });
  }
}
