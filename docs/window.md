When a web page loads, there are three phases: loading, interactive, and complete.

## Loading
The web page starts in the loading phase. In this phase, the parser is interpreting the HTML code. In this phase, the massage port is already open, so it is important that any windows attempting to send messages must wait before sending a message to allow the scripts for the message event handlers to execute. During parsing, some script tags pause the parser. No other tags result in pausing the parser. The types of script tags are:
- classic script (<script>)
- classic deferred script (<script defer>)
- classic async script (<script async>)
- module (deferred) script (<script type="module">)
- module async script (<script type="module" async>)

For any script, the code must be fetched and executed. If the script is inline, then it is already fetched as part of fetching the HTML. Therefore, for inline scripts, this fetch step is skipped. For non-inline classic scripts with no qualifiers, the parser pauses while the script is fetched. For all other types of non-inline scripts, the parser continues to run while the module is fetched.

For async scripts and classic scripts with no qualifiers, the script is executed immediately after it is fetched, regardless of whether the parser has finished or not. For deferred scripts, the script is executed once the parser is finished. These behaviors are the same regardless of whether the script is provided inline or in another file.

Every script tag gets evaluated in the order in which it occurs.

If a script executed before the parser finishes, the DOM will only have the nodes that the parser has parsed up to that point.

## Interactive
Once the parser finishes, the web page is in the interactive phase. At this point, document#readyStateChange fires with document.readyState === "interactive", immediately followed by document#DOMContentLoaded firing. All scripts that did not execute in the loading phase execute is in this phase.

## Complete
Once all scripts have been executed and all resources have been loaded, the web page is in the complete phase. At this point, the window#load event fires. I recommend using this event to signal the window is ready to receive messages.

Note that this phase does not wait for all promises to resolve. This means that code after an await statement may still execute after all scripts have been executed.
