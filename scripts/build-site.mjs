import { spawnSync } from 'node:child_process';
import { cp, mkdir, readdir, rm, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const destination = join(root, 'dist');
const apps = new Map([
  ['15-Flash Cards', 'flashcards-app'],
  ['19-Reddit Client', 'reddit-client'],
  ['21-Pomodoro Timer', 'pomodoro-timer'],
  ['22-Quiz App', 'quiz-app'],
  ['23-Weather Web App', 'weather-web-app'],
  ['24-Story Feature', '24hr-story-feature'],
]);
const weather = '23-Weather Web App';
const npm = process.env.npm_execpath;
const mode = process.argv[2];

function runNpm(args, cwd, env = process.env) {
  const result = spawnSync(process.execPath, [npm, ...args], { cwd, env, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`npm ${args.join(' ')} failed in ${cwd}`);
}

if (mode === 'install') {
  for (const [folder, app] of apps) runNpm(['ci', '--no-audit', '--no-fund'], join(root, folder, app));
} else if (mode === 'build') {
  await rm(destination, { recursive: true, force: true });
  await mkdir(destination);
  for (const name of ['index.html', 'site.css', 'theme.css', 'site.js', 'contact.js']) {
    await cp(join(root, name), join(destination, name));
  }

  const projects = (await readdir(root, { withFileTypes: true }))
    .filter(entry => entry.isDirectory() && /^\d{2}-/.test(entry.name))
    .map(entry => entry.name).sort();

  for (const folder of projects) {
    const source = join(root, folder);
    const target = join(destination, folder);
    const app = apps.get(folder);

    if (app) {
      const workspace = join(source, app);
      const isWeather = folder === weather;
      runNpm(['run', 'lint', '--', '--max-warnings=0'], workspace);
      runNpm(['run', 'build'], workspace, {
        ...process.env,
        ...(isWeather && { NEXT_PUBLIC_BASE_PATH: `/${encodeURIComponent(folder)}` }),
      });
      await cp(join(workspace, isWeather ? 'out' : 'dist'), target, { recursive: true });
    } else {
      await cp(source, target, {
        recursive: true,
        filter: path => path === source || /\.(?:html|css|js|svg|png|jpe?g|webp|ico)$/i.test(path),
      });
    }

    if (!(await stat(join(target, 'index.html'))).isFile()) {
      throw new Error(`Missing entry page for ${folder}`);
    }
  }

  console.log(`Built ${projects.length} projects in ${destination}`);
} else {
  throw new Error('Use npm run setup or npm run build');
}
