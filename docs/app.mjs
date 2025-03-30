/*
(c) 2025 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import * as Main from "./main.mjs";
import * as Message from "./message.mjs";
console.log(performance.now(), window.document.body);
import "./long_load.mjs";
console.log(performance.now(), window.document.body);

console.log(performance.now(), "classic start");
const worker1 = new Worker("worker.js");
worker1.postMessage("hello");
worker1.addEventListener("message", (evt) => {
  console.log(performance.now(), "classic respond");
  console.log(performance.now(), evt.data);
});
worker1.addEventListener("error", (evt) => {
  console.log(performance.now(), "classic worker error");
  console.log(performance.now(), evt);
});

console.log(performance.now(), "module start");
const worker2 = new Worker("worker.mjs", { type: "module" });
worker2.postMessage("hello");
worker2.addEventListener("message", (evt) => {
  console.log(performance.now(), "module respond");
  console.log(performance.now(), evt.data);
});
worker2.addEventListener("error", (evt) => {
  console.log(performance.now(), "module worker error");
  console.log(performance.now(), evt);
});

console.log(performance.now(), "end of app.mjs");
