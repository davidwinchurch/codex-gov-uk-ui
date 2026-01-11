declare module "@ministryofjustice/frontend/moj/filters/all.js" {
  export type MojFilter = (...args: unknown[]) => unknown;

  const mojFilters: () => Record<string, MojFilter>;
  export default mojFilters;
}
