// ESM-HMR Interface: `import.meta.hot`
declare interface ImportMeta {
  readonly hot: {
    readonly data: any

    accept(): void
    accept(cb: (mod: any) => void): void

    acceptDeps(dep: string, cb: (mod: any) => void): void
    acceptDeps(deps: readonly string[], cb: (mods: any[]) => void): void

    dispose(cb: (data: any) => void): void
    decline(): void
    invalidate(): void

    on(event: string, cb: (...args: any[]) => void): void
  }

  readonly url: string
}
