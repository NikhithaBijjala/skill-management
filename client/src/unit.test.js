import  Queue  from "./Queue.js";
//jest.mock('./Queue.js');

var q ;
beforeEach(()=>{
    q = new Queue();
});
// afterEach(() => {
//     q.clear();
//     q = null;
// });
test('Queue is Empty on init', () => {
    expect(q.isEmpty()).toBe(true);
});

test('Exception testing',() =>{
  expect(q.isEmpty()).toBe(true)
})

test('Enque',()=>{
  q.enqueue("Nikhitha");
   expect(q.peek()).toMatch(/Nikhitha/);
})
describe('describe block',()=>{
  test('throwing exceptionsss using mock',()=>{
     const x = new Queue();
     expect(()=>x.peek()).toThrow(Error("Queue Underflow!"));
  })
})
describe('printf',()=>{
  var q = new Queue(1000);
  var mySpy = jest.spyOn(Queue.prototype, "isFull")
  mySpy.mockReturnValue(true)
  expect(() => {
      q.enqueue("a");
  }).toThrow(Error("Queue Overflow!"))
})
