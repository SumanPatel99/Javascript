(function () {
  var elements = document.querySelectorAll('[data-tw-bind]'),
    scope = {};
  elements.forEach(function (element) {
    if (element.type === 'text' || element.type === 'textarea') {
      var propToBind = element.getAttribute('data-tw-bind');
      addScopeProp(propToBind);
      element.onkeyup = function () {
        scope[propToBind] = element.value;
      }
    };
    function addScopeProp(prop) {
      if (!scope.hasOwnProperty(prop)) {
        var value;
        Object.defineProperty(scope, prop, {
          set: function (newValue) {
            value = newValue;
            elements.forEach(function (element) {
              //change value to binded elements
              if (element.getAttribute('data-tw-bind') === prop) {
                if (element.type && (element.type === 'text' ||
                  element.type === 'textarea')) {
                  element.value = newValue;
                }
                else if (!element.type) {
                  element.innerHTML = newValue;
                }
              }
            });
          },
          get: function () {
            return value;
          },
          enumerable: true
        });
      }
    }
  });

})();


// const createState = (state) => {
//     return new Proxy(state, {
//       set(target, property, value) {
//         target[property] = value;
//         render();
//         return true;
//       }
//     });
//   };

//   const state = createState({
//     name: 'DEV',
//     title: 'Front-end Developer'
//   });

//   const listeners = document.querySelectorAll('[data-model]');

//   listeners.forEach((listener) => {
//     const name = listener.dataset.model;
//     listener.addEventListener('keyup', (event) => {
//       state[name] = listener.value;
//       console.log(state);
//     });
//   });


//   const render = () => {
//     const bindings = Array.from(document.querySelectorAll('[data-binding]')).map(
//       e => e.dataset.binding
//     );
//     bindings.forEach((binding) => {
//       document.querySelector(`'[data-binding=${binding}]'`).innerHTML = state[binding];
//       document.querySelector(`'[data-binding=${binding}]'`).value = state[binding];
//     });
//   };

//   render();
