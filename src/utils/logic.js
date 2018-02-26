// @flow

type Call<Args> = [(...Args) => any, Args]

export const callMore = (...calls: Call[]) =>
  calls
    .map(
      call => call[0](
        ...call.splice(1, call.length - 1)
      )
    )

export const fromNullable = (obj: ?Object, prop: string) => obj ? obj[prop] : null
