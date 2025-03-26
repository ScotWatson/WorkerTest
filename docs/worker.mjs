/*
(c) 2025 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// import * as Imported from "./long_load.mjs";
// using import of even long loading modules (without await) causes incoming message to be missed

import * as Message from "./message.mjs";
import * as Imported from "./delayed.mjs";
// using import of await causes incoming message to be missed

// await new Promise((resolve) => { setTimeout(resolve, 1000); });
// using await causes incoming message to be missed

self.postMessage("module worker started");

Message.myQueue.addEventListener("message", (evt) => {
  self.postMessage("Hello World!");
});
