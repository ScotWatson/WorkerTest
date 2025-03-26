/*
(c) 2025 Scot Watson  All Rights Reserved
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import * as Main from "./main.mjs";

console.log("classic start");
const worker1 = new Worker("worker.js");
worker1.postMessage("hello");
worker1.addEventListener("message", (evt) => {
  console.log("classic respond");
  console.log(evt.data);
});
worker1.addEventListener("error", (evt) => {
  console.log("classic worker error");
  console.log(evt);
});

console.log("module start");
const worker2 = new Worker("worker.mjs", { type: "module" });
worker2.postMessage("hello");
worker2.addEventListener("message", (evt) => {
  console.log("module respond");
  console.log(evt.data);
});
worker2.addEventListener("error", (evt) => {
  console.log("module worker error");
  console.log(evt);
});
