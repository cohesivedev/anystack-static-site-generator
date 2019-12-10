# AnyStack™ Static Site Generator

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/cohesivedev/anystack-static-site-generator)

Use **any stack** to create your site which will then be captured as a static site by this tool. Ready to be mirrored via Netlify.

You have these environment variables at your disposal:

|name|purpose|example| 
|---|---|---|
| `URLS` | URLs to be mirrored (delimited with `%%%`) | "https://cohesivedev.herokuapp.com%%%https://cohesivedev.herokuapp.com/availability" |
| `FAVICON_URL` | URL for the site's favicon | "https://i.imgur.com/wjH209s.png" |
| `POST_MIRROR_CMD` | Command to run after the mirroring operation has finished |
| `EXCLUDED_URLS` | URLs to exclude during the mirroring process |

You can see an example of these variables being used here or within the `yarn test` command.
```
URLS='https://babbleboardcms.herokuapp.com%%%https://cohesivedev.github.io/babbleboard' \
EXCLUDED_URLS='https://babbleboardcms.herokuapp.com/online' \
POST_MIRROR_CMD='cd public/babbleboardcms.herokuapp.com/ ; mkdir online ; mv ../cohesivedev.github.io/babbleboard/* online/'  \
FAVICON_URL='https://i.imgur.com/wjH209s.png' \
node .
```
