import Prism from 'prismjs'
;(typeof global !== 'undefined' ? global : (window as any)).Prism = Prism

import 'prism-svelte'
import 'prism-themes/themes/prism-base16-ateliersulphurpool.light.css'
import 'prismjs/components/prism-jsx.min'
import 'prismjs/components/prism-typescript.min'
import 'prismjs/components/prism-tsx.min'
import 'prismjs/components/prism-diff.min'
import 'prismjs/plugins/diff-highlight/prism-diff-highlight.css'

export { Prism }
