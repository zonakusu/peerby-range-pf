Peerby's super minimal range polyfill
===============

Peerby's super minimal range polyfill is probably, with only 2kb compressed, the smallest range polyfill around. Since it's only for IE8/9 users we didn't want to include 20kb+ files for a single range element, so we decided to create our own minimal polyfill.

How to user
===============

Include the JS file to your website and it should replace your input[type="range"] elements into our polyfill solution. When using the slider it will update the original input element. (it's now a hidden element)

When loading DOM after an XHR call, use the following line of code to initialize the polyfill:

```
window.peerbyRangePolyfill.init();
```

Support
===============

We know this is a super minimal solution and is bound to have bugs and limitations. Feel free to add and change code, we'll very likely accept the pull request.