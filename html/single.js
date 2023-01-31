let obj = [
    "Patrick wyne, 30, male",
    "lil wyne, 32, male",
    "Eric mimi, 21, female",
    "Dodos deck, 21, male",
    "Alian Dwine, 22, male",
    "Patrick wyne, 33, male",
    "Patrick wyne, 10, male",
    "Patrick wyne, 40, male",
  ];
  function formatObject(arr) {
    let males = [];
    let females = [];
    arr.forEach((obj) => {
      let person = obj.split(" ");
      let firstname, secondname, age, gender;
      [firstname, secondname, age, gender] = person;
      let personObj = {};
      personObj[firstname] =JSON.stringify( {
        "second-name": secondname,
        age: age,
      });
      gender == "male" ? males.push(personObj) : females.push(personObj);
    });
    return { males, females };
  }
  console.log(formatObject(obj));
  function isPrime(num) {
    for (i = 2; i < num; i++) {
      if (num % i == 0) {
        return false;
      }
    }
    return true;
  }
  function sort(arr) {
    for (let i = 0; i <= arr.length; i++) {
      for (let j = 0; j <= arr.length; j++) {
        if (isPrime(arr[j])) {
          arr.splice(j, 1);
        }
        if (arr[i] > arr[j]) {
          let temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
      }
    }
    return arr;
  }