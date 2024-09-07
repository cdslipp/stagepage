<script>
  import { onMount } from 'svelte';
  import { Swipe } from 'svelte-swipe';

  let actors = [
    {
      name: "Ahmad Meree",
      bio: "Ahmad Meree is a Syrian-born, Kitchener-based theatre artist...",
      socialMedia: {
        twitter: "https://twitter.com/ahmadmeree",
        instagram: "https://instagram.com/ahmadmeree"
      }
    },
    {
      name: "Majdi Bou-Matar",
      bio: "Majdi Bou-Matar was a Lebanese-Canadian theatre director...",
      socialMedia: {
        twitter: "https://twitter.com/majdibm",
        linkedin: "https://linkedin.com/in/majdibm"
      }
    },
    // Add more actors here
  ];

  let currentActor = 0;

  function handleSwipe(event) {
    const { direction } = event.detail;
    if (direction === 'left' && currentActor < actors.length - 1) {
      currentActor++;
    } else if (direction === 'right' && currentActor > 0) {
      currentActor--;
    }
  }
</script>

<section class="actor-bios">
  <h2>Actor Biographies</h2>
  <Swipe on:swipe={handleSwipe}>
    <div class="carousel">
      {#each actors as actor, index}
        <div class="actor-card" class:active={index === currentActor}>
          <h3>{actor.name}</h3>
          <p>{actor.bio}</p>
          <div class="social-links">
            {#each Object.entries(actor.socialMedia) as [platform, url]}
              <a href={url} target="_blank" rel="noopener noreferrer">{platform}</a>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </Swipe>
  <div class="navigation">
    <button on:click={() => currentActor = Math.max(0, currentActor - 1)}>Previous</button>
    <button on:click={() => currentActor = Math.min(actors.length - 1, currentActor + 1)}>Next</button>
  </div>
</section>

<style>
  .actor-bios {
    margin: 20px 0;
  }
  .carousel {
    position: relative;
    height: 300px;
    overflow: hidden;
  }
  .actor-card {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }
  .actor-card.active {
    opacity: 1;
  }
  .social-links {
    margin-top: 10px;
  }
  .social-links a {
    margin-right: 10px;
    text-decoration: none;
    color: #007bff;
  }
  .navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
</style>
