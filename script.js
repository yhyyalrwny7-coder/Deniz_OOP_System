var students = [
  { name:"Yahya",     id:"250418770", type:"ug", extra:"AI & Data Science",       gpa:3.85 },
  { name:"Abdelhady", id:"250418771", type:"ug", extra:"Artificial Intelligence", gpa:3.70 },
  { name:"Layla",     id:"250418772", type:"ug", extra:"Software Engineering",    gpa:3.92 }
];
var selected = null;
var quizShown = {};

function render() {
  var list = document.getElementById('student-list');
  list.innerHTML = '';
  for (var i = 0; i < students.length; i++) {
    (function(idx) {
      var s = students[idx];
      var div = document.createElement('div');
      div.className = 'student-card' + (selected === idx ? ' active' : '');
      div.onclick = function() { selectStudent(idx); };
      div.innerHTML = '<div class="s-name">' + s.name + '</div><div class="s-id">' + s.id + '</div>' +
        '<span class="s-type ' + s.type + '">' + (s.type === 'ug' ? 'UNDERGRAD' : 'POSTGRAD') + '</span>';
      list.appendChild(div);
    })(i);
  }
  var sel = document.getElementById('isinstance-student');
  if (sel) {
    sel.innerHTML = '';
    for (var j = 0; j < students.length; j++) {
      var opt = document.createElement('option');
      opt.value = j;
      opt.textContent = students[j].name + ' — ' + (students[j].type === 'ug' ? 'UnderGrad' : 'PostGrad');
      sel.appendChild(opt);
    }
  }
}

function selectStudent(i) {
  selected = i; render();
  var s = students[i];
  var fee = s.type === 'ug' ? 3500 : 6500;
  var study = s.type === 'ug' ? 'Reading textbooks & attending lectures' : 'Writing research papers & conducting experiments';
  var extraLabel = s.type === 'ug' ? 'Major' : 'Research Topic';
  var cls = s.type === 'ug' ? 'UnderGrad' : 'PostGrad';
  document.getElementById('detail-panel').innerHTML =
    '<div class="detail-header">' +
      '<div><div class="detail-name">' + s.name + '</div>' +
      '<div class="detail-id">' + s.id + ' &nbsp;&middot;&nbsp; ' + cls + '(Student)</div></div>' +
      '<span class="s-type ' + s.type + '" style="margin-top:6px;">' + (s.type === 'ug' ? 'UG' : 'PG') + '</span>' +
    '</div>' +
    '<div class="detail-grid">' +
      '<div class="detail-item"><div class="detail-label">GPA — get_gpa()</div>' +
        '<div class="detail-value green">' + s.gpa.toFixed(2) + ' / 4.00</div>' +
        '<div class="gpa-bar"><div class="gpa-fill" style="width:' + (s.gpa / 4 * 100) + '%"></div></div></div>' +
      '<div class="detail-item"><div class="detail-label">Fee — calculate_fee()</div>' +
        '<div class="detail-value accent">$' + fee.toLocaleString() + '</div></div>' +
      '<div class="detail-item"><div class="detail-label">' + extraLabel + '</div>' +
        '<div class="detail-value" style="font-size:12px;">' + s.extra + '</div></div>' +
      '<div class="detail-item"><div class="detail-label">study() — @abstractmethod</div>' +
        '<div class="detail-value purple" style="font-size:11px;">' + study + '</div></div>' +
      '<div class="detail-item"><div class="detail-label">__str__() output</div>' +
        '<div class="detail-value accent" style="font-size:11px;">' + cls + '(' + s.name + ', ...)</div></div>' +
      '<div class="detail-item"><div class="detail-label">info — @property</div>' +
        '<div class="detail-value" style="font-size:11px;">' + s.name + ' | ' + s.id + '</div></div>' +
    '</div>';
  document.getElementById('action-panel').style.display = 'block';
  addLog('info', 'INFO', 'Student selected: ' + s.name + ' (' + s.id + ')');
  addLog('inh', 'INHERITANCE', s.name + ' is a ' + cls + ' — extends Student base class');
  trigger('box-inh');
}

function showFee() {
  if (selected === null) return;
  var s = students[selected]; var fee = s.type === 'ug' ? 3500 : 6500;
  addLog('pol', 'POLYMORPHISM', s.name + '.calculate_fee() -> $' + fee + ' — same method name, different result because ' + (s.type === 'ug' ? 'UnderGrad' : 'PostGrad') + ' overrides it');
  trigger('box-pol');
  showQuiz('pol', 'Why does calculate_fee() return different values?', ['It uses random numbers', 'Each subclass overrides it with its own value', 'It reads from a database'], 1);
}

function showStudy() {
  if (selected === null) return;
  var s = students[selected];
  var mode = s.type === 'ug' ? 'Reading textbooks and attending lectures' : 'Writing research papers and conducting experiments';
  addLog('abs', 'ABSTRACTION', s.name + '.study() -> "' + mode + '" — @abstractmethod in Student forced this subclass to implement it');
  trigger('box-abs');
  showQuiz('abs', 'What happens if UnderGrad does NOT implement study()?', ['study() returns None', 'Python raises a TypeError', 'Nothing happens'], 1);
}

function showInheritance() {
  if (selected === null) return;
  var s = students[selected]; var cls = s.type === 'ug' ? 'UnderGrad' : 'PostGrad';
  addLog('inh', 'INHERITANCE', cls + ' extends Student -> get_name(), get_gpa(), display_info() all inherited for free');
  trigger('box-inh');
  showQuiz('inh', 'What is the main benefit of Inheritance?', ['Makes code run faster', 'Allows code reuse — subclass gets parent methods automatically', 'It creates more files'], 1);
}

function showEncapsulation() {
  if (selected === null) return;
  var s = students[selected];
  addLog('enc', 'ENCAPSULATION', 'get_name() -> "' + s.name + '" | get_gpa() -> ' + s.gpa + ' — stored as self.__name (private). Only readable through getters');
  trigger('box-enc');
  showQuiz('enc', 'Why do we use self.__name instead of self.name?', ['To make the code look better', 'To protect the attribute from direct external access', 'Python requires it'], 1);
}

function showDecorator() {
  if (selected === null) return;
  var s = students[selected];
  addLog('dec', 'DECORATOR', '@property info -> "' + s.name + ' | ' + s.id + '" — access as student.info not student.info()');
  trigger('box-dec');
  showQuiz('dec', 'What does the @property decorator do?', ['Deletes a method', 'Turns a method into an attribute-like accessor', 'Creates a new class'], 1);
}

function showOverride() {
  if (selected === null) return;
  var s = students[selected]; var cls = s.type === 'ug' ? 'UnderGrad' : 'PostGrad';
  addLog('ovr', 'OVERRIDE', cls + ' overrides study() and calculate_fee() from Student — same name, completely new implementation');
  trigger('box-ovr');
  showQuiz('ovr', 'What is Method Overriding?', ['Deleting a parent method', 'Redefining a parent method in a subclass with new behavior', 'Making a method faster'], 1);
}

function showSuper() {
  if (selected === null) return;
  var s = students[selected]; var cls = s.type === 'ug' ? 'UnderGrad' : 'PostGrad';
  addLog('sup', 'SUPER()', cls + '.__init__ calls super().__init__(name, id, gpa) -> Student.__init__ runs first, then subclass attributes are added');
  trigger('box-sup');
  showQuiz('sup', 'When do we use super().__init__()?', ['To create a copy of a class', 'To call the parent class constructor from inside the child class', 'To delete the parent class'], 1);
}

function showConstructor() {
  if (selected === null) return;
  var s = students[selected]; var cls = s.type === 'ug' ? 'UnderGrad' : 'PostGrad';
  addLog('con', 'CONSTRUCTOR', cls + '.__init__(self, "' + s.name + '", "' + s.id + '", "' + s.extra + '", ' + s.gpa + ') ran automatically when the object was created');
  trigger('box-con');
  showQuiz('con', 'When does __init__ run?', ['Only when we call it manually', 'Automatically the moment an object is created', 'Once per program run'], 1);
}

function showClassVsInstance() {
  if (selected === null) return;
  var s = students[selected];
  addLog('cvi', 'CLASS vs INSTANCE', 'Student.university -> CLASS variable, shared by ALL ' + students.length + ' objects. self.__name = "' + s.name + '" -> INSTANCE variable, unique to this object');
  trigger('box-cvi');
  showQuiz('cvi', 'What is the difference between class and instance variables?', ['No real difference', 'Class vars shared by all instances; instance vars unique per object', 'Instance vars are faster'], 1);
}

function showStr() {
  if (selected === null) return;
  var s = students[selected]; var cls = s.type === 'ug' ? 'UnderGrad' : 'PostGrad';
  addLog('str', '__STR__', 'print(' + s.name.toLowerCase() + ') -> "' + cls + '(' + s.name + ', ' + (s.type === 'ug' ? 'Major' : 'Research') + ': ' + s.extra + ')" — without __str__, Python prints a memory address');
  trigger('box-str');
  showQuiz('str', 'What does print(object) show WITHOUT __str__ defined?', ['The object data clearly', 'A memory address like <Student object at 0x7f...>', 'An error message'], 1);
}

function showIsinstance() {
  if (selected === null) return;
  var s = students[selected]; var cls = s.type === 'ug' ? 'UnderGrad' : 'PostGrad';
  addLog('ins', 'ISINSTANCE', 'isinstance(' + s.name.toLowerCase() + ', ' + cls + ') -> True | isinstance(' + s.name.toLowerCase() + ', Student) -> True — Python checks the full inheritance chain');
  trigger('box-ins');
  showQuiz('ins', 'isinstance(yahya, Student) — what does this return?', ['False — yahya is UnderGrad not Student', 'True — because UnderGrad inherits from Student', 'It raises an error'], 1);
}

function showMultiInheritance() {
  if (selected === null) return;
  var s = students[selected];
  if (s.name === 'Yahya') {
    addLog('mul', 'MULTI-INHERITANCE', 'Yahya is an AIStudent — inherits from BOTH UnderGrad AND Researcher. Can call study() AND conduct_research()');
  } else {
    addLog('mul', 'MULTI-INHERITANCE', 'Python allows AIStudent(UnderGrad, Researcher) — inherits from BOTH parents. Java does NOT support this!');
  }
  trigger('box-mul');
  showQuiz('mul', 'What makes Multiple Inheritance special?', ['Same as regular inheritance', 'A class can inherit from more than one parent simultaneously', 'It creates multiple copies'], 1);
}

function showQuiz(concept, question, options, correctIdx) {
  if (quizShown[concept]) return;
  quizShown[concept] = true;
  setTimeout(function() {
    var c = document.getElementById('log');
    var e = document.createElement('div');
    e.className = 'log-quiz';
    var btns = '';
    for (var i = 0; i < options.length; i++) {
      btns += '<button class="quiz-opt" onclick="checkAnswer(this,' + i + ',' + correctIdx + ',\'' + concept + '\')">' + options[i] + '</button>';
    }
    e.innerHTML = '<div class="quiz-q"><span class="log-tag">[QUICK QUIZ]</span>' + question + '</div><div class="quiz-opts">' + btns + '</div>';
    c.insertBefore(e, c.firstChild);
  }, 700);
}

function checkAnswer(btn, idx, correct, concept) {
  var parent = btn.parentElement;
  var btns = parent.querySelectorAll('.quiz-opt');
  for (var i = 0; i < btns.length; i++) {
    btns[i].setAttribute('disabled', 'true');
    if (i === correct) btns[i].classList.add('correct');
    else btns[i].classList.add('wrong');
  }
  setTimeout(function() {
    if (idx === correct) addLog('info', 'QUIZ CORRECT', 'Great! You understand ' + concept.toUpperCase() + ' — well done!');
    else addLog('info', 'QUIZ WRONG', 'Not quite. Correct answer is highlighted in green above. Review the concept!');
  }, 200);
}

function runTestGpa() {
  var val = parseFloat(document.getElementById('test-gpa').value);
  var result = document.getElementById('gpa-result');
  result.style.display = 'block';
  if (isNaN(val)) {
    result.style.background = 'rgba(100,116,139,0.1)'; result.style.color = '#94a3b8';
    result.innerHTML = 'Please enter a number first'; return;
  }
  if (val >= 0 && val <= 4.0) {
    result.style.background = 'rgba(16,185,129,0.1)'; result.style.color = '#86efac';
    result.innerHTML = 'set_gpa(' + val + ') -> ACCEPTED — valid range 0.0 to 4.0. Stored in private self.__gpa';
    addLog('enc', 'ENCAPSULATION', 'set_gpa(' + val + ') -> validated and stored in self.__gpa (private attribute)');
    trigger('box-enc');
  } else {
    result.style.background = 'rgba(239,68,68,0.1)'; result.style.color = '#fca5a5';
    result.innerHTML = 'BLOCKED! set_gpa(' + val + ') -> raises ValueError — GPA must be 0.0 to 4.0. Private attribute NOT changed!';
    addLog('enc', 'ENCAPSULATION', 'set_gpa(' + val + ') -> BLOCKED — raises ValueError("GPA must be between 0.0 and 4.0")');
    trigger('box-enc');
  }
}

function runIsinstance() {
  var idx = parseInt(document.getElementById('isinstance-student').value);
  var s = students[idx];
  var cls = s.type === 'ug' ? 'UnderGrad' : 'PostGrad';
  var other = s.type === 'ug' ? 'PostGrad' : 'UnderGrad';
  var nm = s.name.toLowerCase();
  var html = '<div style="font-family:var(--mono);font-size:11px;display:flex;flex-direction:column;gap:5px;">';
  html += mkRow('isinstance(' + nm + ', ' + cls + ') -> True', true);
  html += mkRow('isinstance(' + nm + ', Student) -> True  (inherited!)', true);
  if (s.name === 'Yahya') html += mkRow('isinstance(yahya, Researcher) -> True  (Multi-Inheritance!)', true);
  html += mkRow('isinstance(' + nm + ', ' + other + ') -> False', false);
  html += mkRow('isinstance(' + nm + ', DahmanCourse) -> False', false);
  html += '</div>';
  document.getElementById('isinstance-result').innerHTML = html;
  addLog('ins', 'ISINSTANCE', 'isinstance(' + nm + ', ' + cls + ') -> True | isinstance(' + nm + ', Student) -> True');
  trigger('box-ins');
}

function mkRow(txt, ok) {
  var bg = ok ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)';
  var tc = ok ? '#86efac' : '#fca5a5';
  var bc = ok ? 'var(--accent3)' : 'var(--red)';
  return '<div style="padding:6px 10px;border-radius:4px;background:' + bg + ';color:' + tc + ';border-left:3px solid ' + bc + ';">' + txt + '</div>';
}

function enrollSelected() {
  if (selected === null) { alert('Please select a student from the list first!'); return; }
  var s = students[selected];
  var list = document.getElementById('enrolled-list');
  var badges = list.querySelectorAll('.enrolled-badge');
  for (var i = 0; i < badges.length; i++) {
    if (badges[i].textContent === s.name) { addLog('info', 'INFO', s.name + ' is already enrolled'); return; }
  }
  var badge = document.createElement('span');
  badge.className = 'enrolled-badge'; badge.textContent = s.name;
  list.appendChild(badge);
  addLog('inh', 'INHERITANCE', s.name + ' object enrolled in DahmanCourse object — two class instances interacting');
  addLog('enc', 'ENCAPSULATION', 'oop_course.course_name -> "OOP with Python" — @property getter used');
  trigger('box-inh'); trigger('box-enc'); trigger('box-dec');
}

function toggleCourseCode() {
  var el = document.getElementById('course-code');
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

function updateExtraLabel() {
  var type = document.getElementById('m-type').value;
  document.getElementById('m-extra-label').textContent = type === 'ug' ? 'Major' : 'Research Topic';
  document.getElementById('m-extra').placeholder = type === 'ug' ? 'e.g. Software Engineering' : 'e.g. Machine Learning';
}

function openAddModal() { document.getElementById('add-modal').classList.add('show'); }
function closeModal()   { document.getElementById('add-modal').classList.remove('show'); }

function addStudent() {
  var name  = document.getElementById('m-name').value.trim();
  var id    = document.getElementById('m-id').value.trim();
  var type  = document.getElementById('m-type').value;
  var extra = document.getElementById('m-extra').value.trim();
  var gpa   = parseFloat(document.getElementById('m-gpa').value);
  if (!name || !id || !extra || isNaN(gpa)) { alert('Please fill in all fields!'); return; }
  if (gpa < 0 || gpa > 4) { alert('GPA must be between 0.0 and 4.0!'); return; }
  students.push({ name:name, id:id, type:type, extra:extra, gpa:gpa });
  render(); closeModal();
  var cls = type === 'ug' ? 'UnderGrad' : 'PostGrad';
  addLog('obj', 'OBJECT CREATED', cls + '("' + name + '","' + id + '","' + extra + '",' + gpa + ') -> __init__ executed');
  addLog('con', 'CONSTRUCTOR', '__init__ ran automatically when object was created');
  addLog('sup', 'SUPER()', 'super().__init__ called -> Student.__init__ ran first');
  addLog('enc', 'ENCAPSULATION', 'set_gpa(' + gpa + ') validated -> stored in self.__gpa (private)');
  addLog('inh', 'INHERITANCE', name + ' extends Student -> get_name(), get_gpa(), display_info() available for free');
  addLog('abs', 'ABSTRACTION', name + ' MUST implement study() and calculate_fee() — enforced by @abstractmethod');
  trigger('box-con'); trigger('box-sup'); trigger('box-enc'); trigger('box-inh'); trigger('box-abs');
  selectStudent(students.length - 1);
}

function openNoteModal()  { document.getElementById('note-modal').classList.add('show'); }
function closeNoteModal() { document.getElementById('note-modal').classList.remove('show'); }

function switchTab(tabId, btn) {
  var tabs = document.querySelectorAll('.tab-content');
  var btns = document.querySelectorAll('.tab-btn');
  for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove('active');
  for (var i = 0; i < btns.length; i++) btns[i].classList.remove('active');
  document.getElementById(tabId).classList.add('active');
  btn.classList.add('active');
}

function addLog(type, tag, msg) {
  var c = document.getElementById('log');
  var e = document.createElement('div');
  e.className = 'log-entry log-' + type;
  e.innerHTML = '<span class="log-tag">[' + tag + ']</span>' + msg;
  c.insertBefore(e, c.firstChild);
  while (c.children.length > 35) c.removeChild(c.lastChild);
}

function trigger(id) {
  var b = document.getElementById(id); if (!b) return;
  b.classList.add('triggered');
  setTimeout(function() { b.classList.remove('triggered'); }, 1200);
}

document.getElementById('prof-banner').addEventListener('click', function() { openNoteModal(); });

render();
addLog('info',  'SYSTEM',         'Deniz OOP Learning System — Fall 2025 ready');
addLog('obj',   'OBJECT CREATED', 'UnderGrad("Yahya","250418770","AI & Data Science",3.85)');
addLog('obj',   'OBJECT CREATED', 'UnderGrad("Abdelhady","250418771","Artificial Intelligence",3.70)');
addLog('obj',   'OBJECT CREATED', 'UnderGrad("Layla","250418772","Software Engineering",3.92)');
addLog('enc',   'ENCAPSULATION',  'set_gpa() validated for all 3 students — self.__gpa protected');
addLog('inh',   'INHERITANCE',    'All 3 extend Student -> get_name(), get_gpa(), display_info() inherited');
addLog('sup',   'SUPER()',        'super().__init__() called in all 3 constructors');