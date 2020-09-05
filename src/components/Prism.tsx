import Prism from 'prismjs'
;(typeof global !== 'undefined' ? global : (window as any)).Prism = Prism

import 'prism-svelte'
import 'prism-themes/themes/prism-base16-ateliersulphurpool.light.css'
import 'prismjs/plugins/diff-highlight/prism-diff-highlight.css'
import 'prismjs/components/prism-jsx.min'

export { Prism }
