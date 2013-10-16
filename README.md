Peerby's super minimal range polyfill
===============

Peerby's super minimal range polyfill is probably, with only 2kb compressed, the smallest range polyfill around. Since it's only for IE8/9 users we didn't want to include 20kb+ files for a single range element, so we decided to create our own minimal polyfill.

How to use
===============

Include the JS file to your website and it should replace your input[type="range"] elements into our polyfill solution. When using the slider it will update the original input element. (it's now a hidden element)

When loading the DOM after an XHR call (otherwise called on DOMready), use the following line of code to initialize the polyfill:

```
window.peerbyRangePolyfill.init();
```

Styling
===============

You can use the following LESS to style the slider, or just do it yourself :)

```
.peerby-range-wrapper {
    position: relative;

    .peerby-range-bar {
        height: 5px;
        .border-radius(2px);
        background-color: #bbb;
    }

    .peerby-range-dot {
        width: 20px;
        height: 20px;
        position: absolute;
        top: -7px;
        background-color: #428bca;
        .border-radius(10px);
        cursor: move;

        &:hover {
            background-color: #357ebd;
        }
    }
}
```

Support
===============

We know this is a super minimal solution and is bound to have bugs and limitations. Feel free to add and change code, we'll very likely accept the pull request.