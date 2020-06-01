<script>
  import Nav from "./_components/Nav.svelte";
  import Footer from "./_components/Footer.svelte";
  import ApolloClient from "apollo-boost";
  import { setClient } from "svelte-apollo";

  let client = new ApolloClient({
    uri: "http://localhost:8080/graphql"
  });
  setClient(client);

  export let segment;
</script>

<style>
  main {
    position: relative;
    background-color: rgb(22, 22, 22);
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
  img {
    left: 280px;
    top: 22px;
    width: 55px;
    height: 40px;
    position: absolute;
  }
</style>

<Nav {segment} />

<main>
  <slot />
</main>

<Footer />
