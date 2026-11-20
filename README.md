# My Front-End Roadmap Projects

I'm Edma Reyfaldy. I built these 24 projects as I worked through the front-end roadmap. They start with a single-page CV and build up to projects that use browser storage, public APIs, and React.

[Open the project collection](https://lefyar.github.io/roadmap.sh-fe-projects/) ? [My portfolio](https://lefyar.vercel.app/) ? [Front-End Roadmap](https://roadmap.sh/frontend)

## Projects

### Beginner

| Project source | Demo | Challenge |
| --- | --- | --- |
| [Single-Page CV](./01-Single%20Page%20CV/) | [Open app](https://lefyar.github.io/roadmap.sh-fe-projects/01-Single%20Page%20CV/) | [Brief](https://roadmap.sh/projects/single-page-cv) |
| [Basic HTML Website](./02-Basic%20HTML%20Website/) | [Open app](https://lefyar.github.io/roadmap.sh-fe-projects/02-Basic%20HTML%20Website/) | [Brief](https://roadmap.sh/projects/basic-html-website) |
| [Personal Portfolio](./03-Personal%20Portfolio/) | [Open app](https://lefyar.github.io/roadmap.sh-fe-projects/03-Personal%20Portfolio/) | [Brief](https://roadmap.sh/projects/portfolio-website) |
| [Changelog Component](./04-Changelog%20Component/) | [Open app](https://lefyar.github.io/roadmap.sh-fe-projects/04-Changelog%20Component/) | [Brief](https://roadmap.sh/projects/changelog-component) |
| [Testimonial Cards](./05-Testimonial%20Cards/) | [Open app](https://lefyar.github.io/roadmap.sh-fe-projects/05-Testimonial%20Cards/) | [Brief](https://roadmap.sh/projects/testimonial-cards) |
| [Datepicker UI](./06-Datepicker%20UI/) | [Open app](https://lefyar.github.io/roadmap.sh-fe-projects/06-Datepicker%20UI/) | [Brief](https://roadmap.sh/projects/datepicker-ui) |
| [Accessible Form UI](./07-Accessible%20Form%20UI/) | [Open app](https://lefyar.github.io/roadmap.sh-fe-projects/07-Accessible%20Form%20UI/) | [Brief](https://roadmap.sh/projects/accessible-form-ui) |
| [Image Grid Layout](./08-Image%20Grid%20Layout/) | [Open app](https://lefyar.github.io/roadmap.sh-fe-projects/08-Image%20Grid%20Layout/) | [Brief](https://roadmap.sh/projects/image-grid) |
| [Tooltip UI](./09-Tooltip%20UI/) | [Open app](https://lefyar.github.io/roadmap.sh-fe-projects/09-Tooltip%20UI/) | [Brief](https://roadmap.sh/projects/tooltip-ui) |
| [Simple Tabs](./10-Simple%20Tabs/) | [Open app](https://lefyar.github.io/roadmap.sh-fe-projects/10-Simple%20Tabs/) | [Brief](https://roadmap.sh/projects/simple-tabs) |
| [Cookie Consent](./11-Cookie%20Consent/) | [Open app](https://lefyar.github.io/roadmap.sh-fe-projects/11-Cookie%20Consent/) | [Brief](https://roadmap.sh/projects/cookie-consent) |
| [Restricted Textarea](./12-Restricted%20Textarea/) | [Open app](https://lefyar.github.io/roadmap.sh-fe-projects/12-Restricted%20Textarea/) | [Brief](https://roadmap.sh/projects/restricted-textarea) |
| [Accordion Component](./13-Accordion%20Component/) | [Open app](https://lefyar.github.io/roadmap.sh-fe-projects/13-Accordion%20Component/) | [Brief](https://roadmap.sh/projects/accordion) |
| [Age Calculator](./14-Age%20Calculator/) | [Open app](https://lefyar.github.io/roadmap.sh-fe-projects/14-Age%20Calculator/) | [Brief](https://roadmap.sh/projects/age-calculator) |
| [Flash Cards](./15-Flash%20Cards/) | [Open app](https://lefyar.github.io/roadmap.sh-fe-projects/15-Flash%20Cards/) | [Brief](https://roadmap.sh/projects/flash-cards) |

### Intermediate

| Project source | Demo | Challenge |
| --- | --- | --- |
| [Custom Dropdown](./16-Custom%20Dropdown/) | [Open app](https://lefyar.github.io/roadmap.sh-fe-projects/16-Custom%20Dropdown/) | [Brief](https://roadmap.sh/projects/custom-dropdown) |
| [Task Tracker](./17-Task%20Tracker/) | [Open app](https://lefyar.github.io/roadmap.sh-fe-projects/17-Task%20Tracker/) | [Brief](https://roadmap.sh/projects/task-tracker-js) |
| [GitHub Random Repository](./18-GitHub%20Random%20Repository/) | [Open app](https://lefyar.github.io/roadmap.sh-fe-projects/18-GitHub%20Random%20Repository/) | [Brief](https://roadmap.sh/projects/github-random-repo) |
| [Reddit Client](./19-Reddit%20Client/) | [Open app](https://lefyar.github.io/roadmap.sh-fe-projects/19-Reddit%20Client/) | [Brief](https://roadmap.sh/projects/reddit-client) |
| [Temperature Converter](./20-Temperature%20Converter/) | [Open app](https://lefyar.github.io/roadmap.sh-fe-projects/20-Temperature%20Converter/) | [Brief](https://roadmap.sh/projects/temperature-converter) |
| [Pomodoro Timer](./21-Pomodoro%20Timer/) | [Open app](https://lefyar.github.io/roadmap.sh-fe-projects/21-Pomodoro%20Timer/) | [Brief](https://roadmap.sh/projects/pomodoro-timer) |
| [Quiz App](./22-Quiz%20App/) | [Open app](https://lefyar.github.io/roadmap.sh-fe-projects/22-Quiz%20App/) | [Brief](https://roadmap.sh/projects/quiz-app) |
| [Weather Web App](./23-Weather%20Web%20App/) | [Open app](https://lefyar.github.io/roadmap.sh-fe-projects/23-Weather%20Web%20App/) | [Brief](https://roadmap.sh/projects/weather-app) |
| [24-hour Photo Diary](./24-Story%20Feature/) | [Open app](https://lefyar.github.io/roadmap.sh-fe-projects/24-Story%20Feature/) | [Brief](https://roadmap.sh/projects/stories-feature) |

## Run locally

Use Node.js 24 and npm. The root build lints and builds the six framework apps, then gathers all 24 projects in `dist/`.

```sh
npm run setup
npm run build
python -m http.server 8000 --directory dist
```

Open [http://localhost:8000](http://localhost:8000). You can also run `npm ci` and `npm run dev` inside any app folder that contains a `package.json`.

## Deployment

GitHub Actions builds pull requests and publishes the `main` branch to GitHub Pages. On a fork, select **Settings ? Pages ? Build and deployment ? GitHub Actions**. To reproduce the repository URL locally, set `PAGES_BASE_PATH=/roadmap.sh-fe-projects` before building and serve the output at that path.

Weather data comes from [Open-Meteo](https://open-meteo.com/). The Reddit demo includes sample posts and links to Reddit. An approved Reddit feed can be configured through the repository variable `REDDIT_FEED_URL`. [Reddit client setup](./19-Reddit%20Client/reddit-client/)
