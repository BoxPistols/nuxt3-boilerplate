try {
  ;(() => {
    const v = __STORYBOOK_API__
    const {
      ActiveTabs: T,
      Consumer: E,
      ManagerContext: O,
      Provider: h,
      RequestResponseError: y,
      addons: a,
      combineParameters: A,
      controlOrMetaKey: P,
      controlOrMetaSymbol: x,
      eventMatchesShortcut: R,
      eventToShortcut: b,
      experimental_MockUniversalStore: g,
      experimental_UniversalStore: k,
      experimental_getStatusStore: U,
      experimental_getTestProviderStore: I,
      experimental_requestResponse: C,
      experimental_useStatusStore: M,
      experimental_useTestProviderStore: f,
      experimental_useUniversalStore: D,
      internal_fullStatusStore: N,
      internal_fullTestProviderStore: B,
      internal_universalStatusStore: K,
      internal_universalTestProviderStore: V,
      isMacLike: q,
      isShortcutTaken: G,
      keyToSymbol: L,
      merge: Y,
      mockChannel: $,
      optionOrAltSymbol: H,
      shortcutMatchesShortcut: Q,
      shortcutToHumanString: j,
      types: w,
      useAddonState: z,
      useArgTypes: F,
      useArgs: J,
      useChannel: W,
      useGlobalTypes: X,
      useGlobals: Z,
      useParameter: ee,
      useSharedState: te,
      useStoryPrepared: re,
      useStorybookApi: oe,
      useStorybookState: se,
    } = __STORYBOOK_API__
    const e = 'storybook/links'
    const n = {
      NAVIGATE: `${e}/navigate`,
      REQUEST: `${e}/request`,
      RECEIVE: `${e}/receive`,
    }
    a.register(e, t => {
      t.on(n.REQUEST, ({ kind: l, name: i }) => {
        const u = t.storyId(l, i)
        t.emit(n.RECEIVE, u)
      })
    })
  })()
} catch (e) {
  console.error(
    '[Storybook] One of your manager-entries failed: ' + import.meta.url,
    e
  )
}
