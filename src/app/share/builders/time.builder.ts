type InWhat = 'millisecond' | 'minute' | 'hour' | 'second' | 'day';

export default class TimeBuilder {
  private enteredTime: number;

  private inWhat: string;

  private readonly DAY_MILLISECOND = 86_400_000;

  private readonly HOUR_MILLISECOND = 3_600_000;

  private readonly SECOND_MILLISECOND = 1000;

  private readonly MINUTE_MILLISECOND = 60_000;

  private readonly MILLISECOND_MILLISECOND = 1;

  time(time: number): this {
    this.enteredTime = time;
    return this;
  }

  in(what: InWhat): this {
    this.inWhat = what.toUpperCase();
    return this;
  }

  getMinute(): number {
    const inWhat =
      (this[`${this.inWhat}_MILLISECOND` as never] as number) /
        this.MINUTE_MILLISECOND || 0;
    console.log(inWhat);
    return Math.floor(this.enteredTime / inWhat);
  }

  getMillisecond(): number {
    const inWhat = this[`${this.inWhat}_MILLISECOND` as never] || 0;
    return this.enteredTime * inWhat;
  }
}
