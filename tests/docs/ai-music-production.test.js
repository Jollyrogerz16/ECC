const assert = require('assert');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');

const SKILLS = [
  'ai-music-production',
  'suno-prompting',
  'lyric-craft',
  'music-mix-master',
];

const AGENTS = [
  'music-producer',
  'lyricist',
  'mix-reviewer',
];

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    return true;
  } catch (error) {
    console.log(`  ✗ ${name}`);
    console.log(`    Error: ${error.message}`);
    return false;
  }
}

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

function extractFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  assert.ok(match, 'missing YAML frontmatter');
  return match[1];
}

function runTests() {
  console.log('\n=== Testing AI music production pack ===\n');

  let passed = 0;
  let failed = 0;

  if (test('each music skill has SKILL.md with required sections', () => {
    for (const skill of SKILLS) {
      const relativePath = `skills/${skill}/SKILL.md`;
      assert.ok(fs.existsSync(path.join(ROOT, relativePath)), `missing ${relativePath}`);
      const body = read(relativePath);
      const frontmatter = extractFrontmatter(body);
      assert.ok(frontmatter.includes(`name: ${skill}`), `${skill} frontmatter name mismatch`);
      assert.ok(/^description: (?!\|)/m.test(frontmatter), `${skill} description must be an inline scalar`);
      for (const heading of ['## When to Activate', '## Anti-Patterns', '## Related Skills']) {
        assert.ok(body.includes(heading), `${skill} missing ${heading}`);
      }
      const lineCount = body.split(/\r?\n/).length;
      assert.ok(lineCount <= 800, `${skill} is ${lineCount} lines; max is 800`);
    }
  })) passed++; else failed++;

  if (test('pipeline skill encodes the professional Suno-to-release workflow', () => {
    const body = read('skills/ai-music-production/SKILL.md');
    for (const marker of [
      '## The Pipeline',
      'Custom Mode',
      'Manual BPM',
      'stem',
      'LUFS',
      'A&R',
    ]) {
      assert.ok(body.includes(marker), `pipeline skill missing: ${marker}`);
    }
    assert.ok(/Suno Studio/i.test(body), 'pipeline skill must mention Suno Studio');
    assert.ok(/do not treat the first generation as the master/i.test(body),
      'pipeline skill must reject one-shot generation');
  })) passed++; else failed++;

  if (test('Suno skill covers custom-mode craft, not Simple Mode as the default', () => {
    const body = read('skills/suno-prompting/SKILL.md');
    for (const marker of ['[Verse]', '[Chorus]', 'Style', 'Exclude', 'Extend', 'Cover']) {
      assert.ok(body.includes(marker), `suno-prompting missing: ${marker}`);
    }
    assert.ok(/do not name living artists/i.test(body), 'must ban living-artist clones');
  })) passed++; else failed++;

  if (test('lyric skill requires singable scan and structure tags', () => {
    const body = read('skills/lyric-craft/SKILL.md');
    assert.ok(/syllable/i.test(body), 'lyric-craft missing: syllable');
    assert.ok(body.includes('[Pre-Chorus]'), 'lyric-craft missing: [Pre-Chorus]');
    assert.ok(/hook/i.test(body), 'lyric-craft missing: hook');
    assert.ok(/scan/i.test(body), 'lyric-craft missing: scan');
  })) passed++; else failed++;

  if (test('mix skill treats AI stems as pre-processed and rebuilds the balance', () => {
    const body = read('skills/music-mix-master/SKILL.md');
    for (const marker of ['gain stag', 'high-pass', '-14 LUFS', 'true peak', 'baked']) {
      assert.ok(new RegExp(marker, 'i').test(body), `music-mix-master missing: ${marker}`);
    }
  })) passed++; else failed++;

  if (test('each music agent has prompt defense, role, and output format', () => {
    for (const agent of AGENTS) {
      const relativePath = `agents/${agent}.md`;
      assert.ok(fs.existsSync(path.join(ROOT, relativePath)), `missing ${relativePath}`);
      const body = read(relativePath);
      const frontmatter = extractFrontmatter(body);
      assert.ok(frontmatter.includes(`name: ${agent}`), `${agent} frontmatter name mismatch`);
      assert.ok(body.includes('## Prompt Defense Baseline'), `${agent} missing prompt defense`);
      assert.ok(body.includes('## Output Format'), `${agent} missing output format`);
    }
  })) passed++; else failed++;

  if (test('skills and agents are registered in install, package, and maps', () => {
    const modules = JSON.stringify(JSON.parse(read('manifests/install-modules.json')));
    const pkg = JSON.parse(read('package.json'));
    const agentsMd = read('AGENTS.md');
    const commandMap = read('docs/COMMAND-AGENT-MAP.md');
    const agentYaml = read('agent.yaml');

    for (const skill of SKILLS) {
      assert.ok(modules.includes(`skills/${skill}`), `missing from install-modules.json: ${skill}`);
      assert.ok(pkg.files.includes(`skills/${skill}/`), `missing from package.json files: ${skill}`);
      assert.ok(agentYaml.includes(`  - ${skill}`), `missing from agent.yaml: ${skill}`);
    }

    for (const agent of AGENTS) {
      assert.ok(agentsMd.includes(`| ${agent} |`), `missing from AGENTS.md table: ${agent}`);
      assert.ok(commandMap.includes(`\`${agent}\``), `missing from COMMAND-AGENT-MAP: ${agent}`);
    }
  })) passed++; else failed++;

  if (test('catalog counts match the live filesystem', () => {
    const agentCount = fs.readdirSync(path.join(ROOT, 'agents'))
      .filter((name) => name.endsWith('.md')).length;
    const skillCount = fs.readdirSync(path.join(ROOT, 'skills'))
      .filter((name) => fs.statSync(path.join(ROOT, 'skills', name)).isDirectory()).length;
    const readme = read('README.md');
    const agentsMd = read('AGENTS.md');
    const plugin = JSON.parse(read('.claude-plugin/plugin.json'));

    assert.ok(readme.includes(`${agentCount} agents`), `README missing ${agentCount} agents`);
    assert.ok(readme.includes(`${skillCount} skills`), `README missing ${skillCount} skills`);
    assert.ok(agentsMd.includes(`${agentCount} specialized agents`), `AGENTS.md missing ${agentCount} agents`);
    assert.ok(agentsMd.includes(`${skillCount} skills`), `AGENTS.md missing ${skillCount} skills`);
    assert.ok(plugin.description.includes(`${agentCount} agents`), 'plugin.json description is stale');
    assert.ok(plugin.description.includes(`${skillCount} skills`), 'plugin.json description is stale');
  })) passed++; else failed++;

  if (test('cross-skill references resolve in the repo', () => {
    const refs = [
      'skills/ai-music-production/SKILL.md',
      'skills/suno-prompting/SKILL.md',
      'skills/lyric-craft/SKILL.md',
      'skills/music-mix-master/SKILL.md',
      'skills/fal-ai-media/SKILL.md',
      'skills/video-editing/SKILL.md',
      'skills/taste/SKILL.md',
      'skills/brand-voice/SKILL.md',
      'agents/music-producer.md',
      'agents/lyricist.md',
      'agents/mix-reviewer.md',
    ];
    for (const ref of refs) {
      assert.ok(fs.existsSync(path.join(ROOT, ref)), `unresolved reference: ${ref}`);
    }
  })) passed++; else failed++;

  console.log(`\nResults: Passed: ${passed}, Failed: ${failed}`);
  return failed === 0 ? 0 : 1;
}

process.exit(runTests());
