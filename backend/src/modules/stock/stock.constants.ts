export const fallBackPrice = (symbol: string) => {
    return `https://restv2.fireant.vn/posts?symbol=${symbol}`;
}