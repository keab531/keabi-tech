/**
 * Keabi Tech — Interactive Backend Developer Terminal
 * Showcases Python system programming depth, architecture diagrams, and interactive command execution.
 */

export function initTerminal() {
  const terminalBody = document.getElementById('terminal-body');
  const inputEl = document.getElementById('terminal-cli-input');
  const quickBtns = document.querySelectorAll('.quick-cmd-btn');

  if (!terminalBody || !inputEl) return;

  const COMMANDS = {
    help: () => `
<span class="term-prompt">Available Commands:</span>
  <span class="term-cmd">help</span>            - List all available commands
  <span class="term-cmd">cat about.py</span>    - Print Keabi's Python bio & engineering philosophy
  <span class="term-cmd">arch devsafe</span>    - Display DevSafe Vault security & encryption architecture
  <span class="term-cmd">arch school</span>     - Display Django School Management system topology
  <span class="term-cmd">skills</span>          - Output categorized technical stack
  <span class="term-cmd">system_info</span>     - Print AMU environment, student status & GPA target
  <span class="term-cmd">curl /api/ping</span>  - Test simulated backend API health endpoint
  <span class="term-cmd">contact</span>         - Print direct developer contact channels
  <span class="term-cmd">clear</span>           - Clear terminal buffer
`,

    'cat about.py': () => `
<span class="term-dim"># about.py — Written by Keabzend (Keabi) Bekele Kolcha</span>
<span class="term-warning">class</span> <span class="term-cmd">SoftwareEngineer</span>:
    <span class="term-warning">def</span> <span class="term-cmd">__init__</span>(self):
        self.name = <span class="term-success">"Keabzend Bekele Kolcha"</span>
        self.handle = <span class="term-success">"Keabi"</span>
        self.university = <span class="term-success">"Arba Minch University (AMU)"</span>
        self.discipline = <span class="term-success">"Software Engineering"</span>
        self.primary_language = <span class="term-success">"Python"</span>
        self.core_stack = [<span class="term-success">"Django"</span>, <span class="term-success">"Flask"</span>, <span class="term-success">"PostgreSQL"</span>, <span class="term-success">"Linux"</span>]
        self.motto = <span class="term-success">"Ideas → Production"</span>
    
    <span class="term-warning">def</span> <span class="term-cmd">current_goal</span>(self):
        <span class="term-warning">return</span> <span class="term-success">"Master scalable backend architectures, secure auth, and distributed systems."</span>

<span class="term-dim">keabi = SoftwareEngineer()</span>
<span class="term-dim">print(keabi.current_goal())</span>
>> <span class="term-success">Master scalable backend architectures, secure auth, and distributed systems.</span>
`,

    'arch devsafe': () => `
<span class="term-prompt">DevSafe Vault Architecture & Data Pipeline:</span>
+----------------------+        HTTP Multipart       +---------------------------+
|  User File Input     | ==========================> | Flask API Route Handler   |
+----------------------+                             +---------------------------+
                                                                   ||
                                                    Extract Salt + 600k PBKDF2
                                                                   ||
                                                     +---------------------------+
                                                     | AES-256-GCM Cipher Stream |
                                                     +---------------------------+
                                                                   ||
                                                     +---------------------------+
                                                     | Encrypted Block on Disk   |
                                                     | + SQLite Metadata Record  |
                                                     +---------------------------+
<span class="term-success">[OK] Zero plaintext persistence. Recovery trash quarantine buffer active.</span>
`,

    'arch school': () => `
<span class="term-prompt">Django School Management System Topology:</span>
[ Web Browser ] ---> [ Reverse Proxy / Web Gateway ] ---> [ WSGI Gunicorn ]
                                                                 |
                                                     [ Django MVT Controller ]
                                                      /                     \\
                                         [ Template Engine ]         [ Relational ORM ]
                                                                            |
                                                                   [ PostgreSQL 16 ]
                                                                   - Indexed Queries
                                                                   - Row-level lock
`,

    skills: () => `
<span class="term-prompt">Technical Skill Matrix:</span>
  • <span class="term-warning">Languages:</span>     Python (Primary), JavaScript, Java, C++ (exploring), Go (exploring)
  • <span class="term-warning">Backend:</span>       Django, Flask, SQLAlchemy, RESTful API design, JWT/HMAC
  • <span class="term-warning">Databases:</span>     PostgreSQL (B-tree indexing, normalization), MySQL, SQLite
  • <span class="term-warning">Systems:</span>       Linux / Bash, Git, Docker, Systemd, Nginx basics
`,

    system_info: () => `
<span class="term-prompt">System Environment Diagnostic:</span>
  Host:            keabi-workstation (Ubuntu 24.04 LTS / AMU Lab)
  Engineer:        Keabzend (Keabi) Bekele Kolcha
  Affiliation:     Arba Minch University, Department of Software Engineering
  Academic Goal:   Target 4.00 GPA
  Status:          Open for internship opportunities & backend collaborations
`,

    'curl /api/ping': () => `
<span class="term-dim">> GET /api/ping HTTP/1.1</span>
<span class="term-dim">> Host: api.keabi.tech</span>
<span class="term-dim">> User-Agent: curl/8.5.0</span>
<span class="term-success">< HTTP/1.1 200 OK</span>
<span class="term-success">< Content-Type: application/json</span>
<span class="term-success">< Date: ${new Date().toUTCString()}</span>
{
  <span class="term-cmd">"status"</span>: <span class="term-success">"healthy"</span>,
  <span class="term-cmd">"brand"</span>: <span class="term-success">"Keabi Tech"</span>,
  <span class="term-cmd">"tagline"</span>: <span class="term-success">"Ideas → Production"</span>,
  <span class="term-cmd">"uptime"</span>: <span class="term-success">"99.98%"</span>
}
`,

    contact: () => `
<span class="term-prompt">Direct Reach:</span>
  • Email:    keabzendbekele8@gmail.com
  • GitHub:   https://github.com/keabi531
  • Telegram: @keabi_tech
  • Location: Wolaita Sodo / Arba Minch, Ethiopia
`
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();

    // Append executed line
    appendOutput(`<div><span class="term-prompt">keabi@amu:~$</span> <span class="term-cmd">${escapeHtml(rawCmd)}</span></div>`);

    if (!cmd) return;

    if (cmd === 'clear') {
      terminalBody.innerHTML = '';
      return;
    }

    if (COMMANDS[cmd]) {
      const result = COMMANDS[cmd]();
      appendOutput(`<div>${result}</div>`);
    } else {
      appendOutput(`<div class="term-warning">bash: command not found: ${escapeHtml(rawCmd)}. Type <span class="term-cmd">help</span> for a list of commands.</div>`);
    }

    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function appendOutput(html) {
    const line = document.createElement('div');
    line.className = 'terminal-output-line';
    line.innerHTML = html;
    terminalBody.appendChild(line);
  }

  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = inputEl.value;
      inputEl.value = '';
      executeCommand(val);
    }
  });

  // Focus input on terminal body click
  terminalBody.addEventListener('click', () => {
    inputEl.focus();
  });

  // Quick Command Chips
  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) {
        inputEl.value = '';
        executeCommand(cmd);
      }
    });
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
