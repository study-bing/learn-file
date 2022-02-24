<template>
  <div>
    <h1>{{ msg }}{{ aaa }}</h1>
     <h1>123123</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Hello Jest',
      aaa: '123'
    };
  },
};
</script>
