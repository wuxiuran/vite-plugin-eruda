import type { IndexHtmlTransformResult, HtmlTagDescriptor } from 'vite'

export default ({
  debug
} : {
  debug: boolean | undefined
} = {
  debug: undefined
}) => {
  return {
    name: 'vite-plugin-eruda',
    transformIndexHtml(html: string): IndexHtmlTransformResult {
      const tags: HtmlTagDescriptor[] = [
        {
          tag: 'script',
          attrs: {
            src: 'https://eruda.liriliri.io/eruda.min.js',
          },
          injectTo: 'head',
        },
        {
          tag: 'script',
          children: 'eruda.init();',
          injectTo: 'head',
        }
      ]
      if (debug === true) {
        return {
          html,
          tags
        }
      } else if (debug === false) {
        return html
      }
      // @ts-ignore
      if (process.env.NODE_ENV !== "production") {
        return {
          html,
          tags
        }
      } else {
        return html
      }
    }
  }
}
