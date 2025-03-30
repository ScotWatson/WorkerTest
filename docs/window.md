When a web page loads, there are three phases: loading, interactive, and complete.

## Loading
The web page starts in the loading phase. In this phase, the parser is interpreting the HTML code. In this phase, the massage port is already open, so it is important that any windows attempting to send messages must wait before sending a message to allow the scripts for the message event handlers to execute. During parsing, some script tags pause the parser. No other tags result in pausing the parser. The types of script tags are:
- classic script (<script>)
- classic deferred script (<script defer>)
- classic async script (<script async>)
- module (deferred) script (<script type="module">)
- module async script (<script type="module" async>)

For any script, the code must be fetched and executed. If the script is inline, then it is already fetched as part of fetching the HTML. Therefore, for inline scripts, this fetch step is skipped. For non-inline classic scripts with no qualifiers, the parser pauses while the script is fetched. For all other types of non-inline scripts, the parser continues to run while the script is fetched.

For async scripts and classic scripts with no qualifiers, the script is executed immediately after it is fetched, regardless of whether the parser has finished or not. For deferred scripts, the script is executed once the parser is finished. These behaviors are the same regardless of whether the script is provided inline or in another file.

Every script tag executes as its own task.

Scripts are queued to be fetched in the order in which their tags occur, but may be received in a different order. For scripts where the parser continues to run while the script is fetched, this may result in scripts being executed out of order.

In module scripts, although import statement may be mixed with other statements, all import statements will be executed first, then all other statements, each in order. Each module is only executed once per execution environment, regardless of how many times it is imported. An import statement queues a module to be fetched and executed. The modules are executed in the order in which the import statements occur, after all modules have been fetched. If one of the imported modules has a top level await, it pauses the execution of all non-import statements on the module.

If a script executed before the parser finishes, the DOM will only have the nodes that the parser has parsed up to that point.

## Interactive
Once the parser finishes, the web page is in the interactive phase. At this point, document#readyStateChange fires with document.readyState === "interactive", immediately followed by document#DOMContentLoaded firing. All scripts that did not execute in the loading phase execute is in this phase.

## Complete
Once all scripts have been executed and all resources have been loaded, the web page is in the complete phase. At this point, the window#load event fires. I recommend using this event to signal the window is ready to receive messages.

Note that this phase does not wait for all promises to resolve. This means that code after an await statement may still execute after all scripts have been executed.
