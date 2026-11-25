// ===== AQA Core Maths question generators (shared by skills.html and quiz.html) =====
// Chapters follow the textbook contents page used by the Exam Question Selector (data.js).
// Strands: d data & statistics, f money & finance, a modelling & analysis, p Paper 2A topics
const SN={d:"Data & statistics",f:"Money & finance",a:"Modelling & analysis",p:"Paper 2A topics"};
const CH=[
{s:"d",n:1,nm:"Sampling methods and use of random numbers",sb:["Naming sampling methods","Stratified sampling","Systematic sampling and random numbers"]},
{s:"d",n:2,nm:"Types of data and numerical measures",sb:["Types of data","Averages and range from a list","Mean from a frequency table","Standard deviation","Interquartile range"]},
{s:"d",n:3,nm:"Box and whisker plots and cumulative frequency graphs",sb:["Median and quartiles","Outliers","Cumulative frequency","Comparing distributions"]},
{s:"d",n:4,nm:"Histograms",sb:["Frequency density","Frequency from a histogram","Estimating from a histogram"]},
{s:"f",n:5,nm:"Borrowing money",sb:["Simple interest","Compound interest","AER","Cost of credit","Loan balances"]},
{s:"f",n:6,nm:"Budgeting",sb:["Monthly budgets","Best buys","Wages and overtime","Currency conversion"]},
{s:"f",n:7,nm:"Taxation",sb:["Income tax","National Insurance","VAT","Take-home pay"]},
{s:"f",n:8,nm:"Student loans",sb:["Loan repayments","Interest on a student loan","Two loans together"]},
{s:"f",n:9,nm:"Percentage change",sb:["Increase and decrease by a percentage","Percentage change","Reverse percentages","Repeated percentage change","Percentage points"]},
{s:"a",n:10,nm:"Modelling and estimation",sb:["Fermi estimates","Rates and unit conversions","Bounds and error intervals","Volume and surface area models","Growth models"]},
{s:"a",n:11,nm:"Critical analysis",sb:["Proportions from tables","Rates per 1000","Misleading statistics"]},
{s:"p",n:12,nm:"Normal distribution",sb:["Properties of the normal distribution","Normal probabilities","Standardising","Expected numbers"]},
{s:"p",n:13,nm:"Confidence intervals",sb:["Standard error","95% confidence intervals","Width and sample size","Interpreting confidence intervals"]},
{s:"p",n:14,nm:"Scatter graphs",sb:["Types of correlation","Interpolation and extrapolation","Spotting an outlier","Correlation and causation"]},
{s:"p",n:15,nm:"Regression lines",sb:["Using a regression line","Interpreting the gradient","Finding the regression line"]},
{s:"p",n:16,nm:"Applications of the product moment correlation coefficient (pmcc)",short:"PMCC",sb:["Calculating the pmcc","Interpreting the pmcc","Testing for correlation","Correlation and causation"]}
];
const KK=(c,i)=>`C:${c.n}:${i}`;

// maths display (same notation as the A-Level Skills Checker): ^{..} power, _{..} subscript, \f{a}{b} fraction, \r{..} root
const F=s=>s.replace(/</g,"&lt;").replace(/\^\{([^{}]*)\}|\^(-?\w+)/g,(m,a,b)=>"<sup>"+(a||b)+"</sup>").replace(/_\{([^{}]*)\}/g,"<sub>$1</sub>").replace(/\\r\{([^{}]*)\}/g,"<span class=rt><span class=rd>&#8203;</span><span class=rc>$1</span></span>").replace(/\\f\{([^{}]*)\}\{([^{}]*)\}/g,"<span class=fr><i>$1</i><b>$2</b></span>").replace(/(?<![A-Za-z])-(?=\d)/g,"−");

// helpers
const r=(a,b)=>a+Math.floor(Math.random()*(b-a+1)),pick=a=>a[r(0,a.length-1)];
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=r(0,i);[a[i],a[j]]=[a[j],a[i]]}return a};
const rd=(x,d)=>{const k=10**d;return Math.round(x*k+(x>=0?1e-9:-1e-9))/k};
const dp=(x,d)=>rd(x,d).toFixed(d);
const sf=(x,n)=>{if(!x)return"0";const v=Number(x.toPrecision(n)),e=Math.floor(Math.log10(Math.abs(v))),d=n-1-e;return d>0?v.toFixed(d):String(v)};
const cm=x=>Number(x).toLocaleString("en-GB",{maximumFractionDigits:6});
const gbp=x=>"£"+Number(rd(x,2)).toLocaleString("en-GB",{minimumFractionDigits:2,maximumFractionDigits:2});
const gbp0=x=>"£"+cm(x);
const pc=(x,d=1)=>dp(x,d)+"%";
const sum=a=>a.reduce((s,v)=>s+v,0),mean=a=>sum(a)/a.length;
const srt=a=>a.slice().sort((x,y)=>x-y);
const med=a=>{const s=srt(a),n=s.length;return n%2?s[(n-1)/2]:(s[n/2-1]+s[n/2])/2};
const quart=a=>{const s=srt(a),n=s.length,h=Math.floor(n/2);return[med(s.slice(0,h)),med(s),med(s.slice(n-h))]};
const sdn=a=>{const m=mean(a);return Math.sqrt(sum(a.map(v=>(v-m)**2))/a.length)};
const nums=(n,a,b)=>Array.from({length:n},()=>r(a,b));
const distinct=(n,a,b)=>{const s=new Set;while(s.size<n)s.add(r(a,b));return[...s]};
const others=(all,a,k=3)=>shuf(all.filter(x=>x!==a)).slice(0,k);
const stdf=(x,n=2)=>{let e=Math.floor(Math.log10(Math.abs(x))),m=(x/10**e).toPrecision(n);if(+m>=10){e++;m=(x/10**e).toPrecision(n)}return`${m} × 10^{${e}}`};
// normal distribution
const erf=x=>{const s=Math.sign(x);x=Math.abs(x);const t=1/(1+.3275911*x),y=1-((((1.061405429*t-1.453152027)*t+1.421413741)*t-.284496736)*t+.254829592)*t*Math.exp(-x*x);return s*y};
const Phi=z=>.5*(1+erf(z/Math.SQRT2));
// regression and correlation
const Sxy=(x,y)=>{const mx=mean(x),my=mean(y);return sum(x.map((v,i)=>(v-mx)*(y[i]-my)))};
const pmcc=(x,y)=>Sxy(x,y)/Math.sqrt(Sxy(x,x)*Sxy(y,y));
const andJoin=a=>a.length<2?a.join(""):a.slice(0,-1).join(", ")+" and "+a[a.length-1];
const ord=n=>n+((n%100>=11&&n%100<=13)?"th":["th","st","nd","rd"][n%10]||"th");
const pairs=(x,y)=>x.map((v,i)=>`(${v}, ${y[i]})`).join(", ");

// Generators: key "C:chapter:subsection" -> list of f(level) with 0 standard, 1 challenge, returning [question, answer, optional wrong answers]
const G={},GC={};
const add=(k,f)=>{G[k]=[].concat(G[k]||[],[f])};

// ---------- Chapter 1: Sampling ----------
const SM=["Simple random sampling","Systematic sampling","Stratified sampling","Quota sampling","Opportunity sampling","Cluster sampling"];
add("C:1:0",L=>{const D=L?[
["A factory checks the 7th, 27th, 47th, 67th, … item made each day","Systematic sampling"],
["A council splits a town into 40 areas, picks 4 areas at random and surveys every household in them","Cluster sampling"],
["A market researcher must interview 15 under-25s, 20 people aged 25 to 60 and 10 over-60s, and chooses whoever is available","Quota sampling"],
["A head teacher wants 10% of each year group, chosen at random within each year","Stratified sampling"],
["A journalist interviews the first 25 shoppers leaving a supermarket","Opportunity sampling"],
["Every member of a gym has a membership number and 50 numbers are chosen using a random number generator","Simple random sampling"]
]:[
["Every person on a list is given a number and a computer chooses numbers at random","Simple random sampling"],
["A random starting point is chosen and then every 10th name on a list is selected","Systematic sampling"],
["The population is split into groups and a random sample is taken from each group in proportion to its size","Stratified sampling"],
["An interviewer stops people in the street until she has asked 20 men and 20 women","Quota sampling"],
["A student asks the first 30 people who walk into the canteen","Opportunity sampling"],
["A few schools are chosen at random and every pupil in those schools is surveyed","Cluster sampling"]
];const[d,a]=pick(D);return[`${d}. Name this sampling method.`,a,others(SM,a)]});
const STR=[["Year 12 students","Year 13 students"],["full-time staff","part-time staff"],["Year 7","Year 8","Year 9"],["day students","boarders"],["under-30s","30 to 50-year-olds","over-50s"]];
add("C:1:1",L=>{const g=pick(STR.filter(x=>L?x.length==3:true)),n=pick([20,25,30,40,50,60,80]);
 if(!L){const k=pick([4,5,6,8,10,12,15]);let s;do{s=g.map(()=>r(2,n));s[s.length-1]=0;s[s.length-1]=n-sum(s.slice(0,-1))}while(s.some(v=>v<3));
  const N=s.map(v=>v*k),i=r(0,g.length-1);return[`A population is made up of ${andJoin(g.map((t,j)=>`${N[j]} ${t}`))}. A stratified sample of ${n} is taken. How many ${g[i]} should be in the sample?`,""+s[i],[""+Math.round(n/g.length),""+(s[i]+1),""+Math.round(N[i]/10)]]}
 let N,ex,s;do{N=g.map(()=>r(60,400));ex=N.map(v=>v*n/sum(N));s=ex.map(Math.round)}while(sum(s)!=n||ex.some(v=>Math.abs(v%1-.5)<.1));
 return[`A population has ${g.map((t,j)=>`${N[j]} ${t}`).join(", ")}. A stratified sample of ${n} is taken. Find how many from each group should be in the sample.`,g.map((t,j)=>`${t}: ${s[j]}`).join(", ")]});
add("C:1:2",L=>{if(!L){const n=pick([20,25,40,50,60,80,100]),k=r(3,15),N=n*k;return[`A systematic sample of ${n} is to be taken from a numbered list of ${N} people. Find the sampling interval.`,`Every ${ord(k)} person`,[`Every ${ord(n)} person`,`Every ${ord(k+1)} person`,`Every ${ord(k+2)} person`]]}
 const N=r(3,8)*100+pick([0,50]);let g=[],v=[];
 while(v.length<3){let x;const t=Math.random();if(t<.3)x=r(N+1,999);else if(t<.4&&v.length)x=pick(v);else if(t<.45)x=0;else x=r(1,N);g.push(String(x).padStart(3,"0"));if(x>=1&&x<=N&&!v.includes(x))v.push(x)}
 while(g.length<8)g.push(String(r(0,999)).padStart(3,"0"));
 const raw=g.slice(0,3).map(Number).join(", ");
 return[`Items are numbered 001 to ${N}. Use these random numbers, three digits at a time, to choose three items (ignore numbers out of range and repeats): ${g.join(" ")}`,v.join(", "),[raw,v.slice(0,2).concat([+g[g.length-1]]).join(", "),[v[1],v[0],v[2]].join(", ")]]});

// ---------- Chapter 2: Types of data and numerical measures ----------
const TD={"Qualitative":["eye colour","favourite sport","make of car","type of pet","blood group","colour of a front door"],"Quantitative discrete":["number of siblings","goals scored in a match","number of cars in a household","number of people in a queue","number of texts sent in a day"],"Quantitative continuous":["height","mass of an apple","time to run 100 m","temperature at noon","length of a leaf","volume of water in a bottle"]};
add("C:2:0",L=>{const t=pick(Object.keys(TD)),v=pick(TD[t]);
 if(!L)return[`What type of data is "${v}"?`,t,others(Object.keys(TD),t,2).concat(["Qualitative continuous"])];
 const p=Math.random()<.5,who=p?pick(["Sam records","A student measures","Priya collects"]):pick(["A researcher downloads","Tom looks up","A student copies from a website"]);
 const a=(p?"Primary, ":"Secondary, ")+t.toLowerCase();
 const all=["Primary","Secondary"].flatMap(s=>Object.keys(TD).map(k=>s+", "+k.toLowerCase()));
 return[`${who} the ${v} for a sample of 30. What source and type of data is this?`,a,others(all,a)]});
add("C:2:1",L=>{if(!L){const n=pick([7,8,9]);let a=nums(n,2,30);const s=pick(["mean","median","mode","range"]);
  if(s=="mean")a[n-1]+=(n-sum(a)%n)%n;if(s=="mode"){const m=pick(a);a[0]=m;a[1]=m;a[2]=m;a=shuf(a)}
  const cnt={};a.forEach(x=>cnt[x]=(cnt[x]||0)+1);const mo=+Object.keys(cnt).sort((x,y)=>cnt[y]-cnt[x])[0];
  if(s=="mode"&&Object.values(cnt).filter(c=>c==cnt[mo]).length>1)return G["C:2:1"][0](0);
  const v={mean:mean(a),median:med(a),mode:mo,range:Math.max(...a)-Math.min(...a)}[s];
  return[`Find the ${s} of: ${a.join(", ")}`,cm(v),[cm(s=="median"?a[Math.floor(n/2)]:s=="mean"?med(a)+.5:v+2),cm(v+1),cm(Math.max(0,v-1))]]}
 if(Math.random()<.5){const n=r(5,7),m=r(8,25),a=nums(n-1,m-6,m+6),x=n*m-sum(a);if(x<1)return G["C:2:1"][0](1);return[`The mean of ${a.join(", ")} and x is ${m}. Find x.`,"x = "+x]}
 const n=r(6,12),m=r(10,30),v=r(m+5,m+25),nm=rd((n*m-v)/(n-1),2);return[`The mean of ${n} numbers is ${m}. The number ${v} is removed. Find the mean of the numbers left, to 2 decimal places.`,dp(nm,2),[dp((n*m-v)/n,2),dp(m-v/n,2),dp((n*m+v)/(n+1),2)]]});
add("C:2:2",L=>{if(!L){const x0=pick([0,1]),xs=[0,1,2,3,4].map(v=>v+x0),f=nums(5,1,12),m=sum(xs.map((v,i)=>v*f[i]))/sum(f),ctx=pick(["Goals scored","Number of pets","Number of siblings","Books read"]);
  return[`${ctx} (x): ${xs.join(", ")} | Frequency: ${f.join(", ")}. Find the mean, to 2 decimal places.`,dp(m,2),[dp(sum(xs.map((v,i)=>v*f[i]))/5,2),dp(mean(xs),2),dp(m+.1,2)]]}
 const w=pick([5,10,20]),f=nums(5,2,15),cls=f.map((_,i)=>`${i*w} ≤ t < ${(i+1)*w}`),mid=f.map((_,i)=>i*w+w/2),m=sum(mid.map((v,i)=>v*f[i]))/sum(f),up=sum(f.map((v,i)=>v*(i+1)*w))/sum(f);
 return[`Time t (minutes): ${cls.join(", ")} | Frequency: ${f.join(", ")}. Estimate the mean time, to 1 decimal place.`,dp(m,1)+" minutes",[dp(up,1)+" minutes",dp(sum(f)*w/5,1)+" minutes",dp(m-w/4,1)+" minutes"]]});
add("C:2:3",L=>{if(!L){const a=nums(pick([5,6]),1,20),s=sdn(a),s1=Math.sqrt(sum(a.map(v=>(v-mean(a))**2))/(a.length-1));
  return[`Find the standard deviation of: ${a.join(", ")}. Use the divisor n and give your answer to 2 decimal places.`,dp(s,2),[dp(s1,2),dp(s*s,2),dp(s+.5,2)]]}
 if(Math.random()<.5){const n=r(10,25),m=r(10,40),v=r(4,60),sx=n*m,sxx=n*(v+m*m);return[`For ${n} values, Σx = ${sx} and Σx^{2} = ${sxx}. Find the mean and standard deviation, to 2 decimal places.`,`mean = ${m}, sd = ${dp(Math.sqrt(v),2)}`]}
 const xs=[1,2,3,4,5],f=nums(5,1,9),a=xs.flatMap((x,i)=>Array(f[i]).fill(x));return[`x: ${xs.join(", ")} | Frequency: ${f.join(", ")}. Find the standard deviation (divisor n), to 3 decimal places.`,dp(sdn(a),3),[dp(sdn(xs),3),dp(sdn(a)**2,3),dp(sdn(f),3)]]});
add("C:2:4",L=>{const n=L?pick([9,13,15]):pick([7,11]),a=distinct(n,10,70),[q1,,q3]=quart(a);return[`Find the interquartile range of: ${a.join(", ")}`,cm(q3-q1),[cm(Math.max(...a)-Math.min(...a)),cm(q3-q1+r(1,3)),cm(med(a))]]});

// ---------- Chapter 3: Box plots and cumulative frequency ----------
add("C:3:0",L=>{const n=L?15:11,a=distinct(n,5,60),[q1,m,q3]=quart(a);
 if(!L)return[`Find the median and quartiles of: ${a.join(", ")}`,`Q_{1} = ${cm(q1)}, median = ${cm(m)}, Q_{3} = ${cm(q3)}`,[`Q_{1} = ${cm(q1)}, median = ${a[5]}, Q_{3} = ${cm(q3)}`,`Q_{1} = ${a[2]}, median = ${a[5]}, Q_{3} = ${a[8]}`,`Q_{1} = ${cm(q1-1)}, median = ${cm(m)}, Q_{3} = ${cm(q3+1)}`].filter(x=>x!=`Q_{1} = ${cm(q1)}, median = ${cm(m)}, Q_{3} = ${cm(q3)}`)];
 return[`Find the median and the interquartile range of: ${a.join(", ")}`,`median = ${cm(m)}, IQR = ${cm(q3-q1)}`]});
add("C:3:1",L=>{if(!L){const q1=r(10,40),iqr=r(4,20)*2,q3=q1+iqr;return[`A data set has Q_{1} = ${q1} and Q_{3} = ${q3}. An outlier is more than 1.5 × IQR below Q_{1} or above Q_{3}. Find the limits for outliers.`,`below ${cm(q1-1.5*iqr)} or above ${cm(q3+1.5*iqr)}`,[`below ${cm(q1-iqr)} or above ${cm(q3+iqr)}`,`below ${cm(q1-3*iqr)} or above ${cm(q3+3*iqr)}`,`below ${cm(q1-1.5*iqr+1)} or above ${cm(q3+1.5*iqr-1)}`]]}
 for(;;){const a=distinct(10,20,50),[q1,,q3]=quart(a),hi=q3+1.5*(q3-q1),out=Math.ceil(hi)+r(2,12);const b=shuf(a.concat(out)),[Q1,,Q3]=quart(b),H=Q3+1.5*(Q3-Q1),L_=Q1-1.5*(Q3-Q1);const o=b.filter(v=>v>H||v<L_);if(o.length==1&&o[0]==out){const big=srt(a).slice(-3).map(String);return[`Use the 1.5 × IQR rule to find the outlier in: ${b.join(", ")}`,""+out,big]}}});
add("C:3:2",L=>{const w=pick([10,20]),f=nums(5,3,25),cf=f.map((_,i)=>sum(f.slice(0,i+1))),N=cf[4];
 if(!L){const k=r(1,3);return[`Mass m (g): ${f.map((_,i)=>`${i*w} < m ≤ ${(i+1)*w}`).join(", ")} | Frequency: ${f.join(", ")}. How many items have a mass of ${(k+1)*w} g or less?`,""+cf[k],[""+f[k],""+cf[k-1],""+(N-cf[k])]]}
 if(N%2)f[4]++;const c2=f.map((_,i)=>sum(f.slice(0,i+1))),T=c2[4],h=T/2,i=c2.findIndex(v=>v>=h),before=i?c2[i-1]:0,m=i*w+(h-before)/f[i]*w;
 return[`Mass m (g): ${f.map((_,i)=>`${i*w} < m ≤ ${(i+1)*w}`).join(", ")} | Frequency: ${f.join(", ")}. Use linear interpolation to estimate the median mass, to 1 decimal place.`,dp(m,1)+" g",[dp(i*w+w/2,1)+" g",dp(m+w/4,1)+" g",dp(i*w+(h-before)/f[i],1)+" g"]]});
add("C:3:3",L=>{const ctx=pick([["Class A","Class B","test marks"],["Shop X","Shop Y","daily sales"],["Team P","Team Q","run times (s)"]]),m1=r(20,50),m2=m1+pick([-1,1])*r(3,10),i1=r(5,15),i2=Math.max(2,i1+pick([-1,1])*r(3,8));
 return[`Compare the ${ctx[2]}: ${ctx[0]} has median ${m1} and IQR ${i1}; ${ctx[1]} has median ${m2} and IQR ${i2}.`,`${m1>m2?ctx[0]:ctx[1]} has the higher median, so higher ${ctx[2]} on average; ${i1<i2?ctx[0]:ctx[1]} has the smaller IQR, so its ${ctx[2]} are more consistent`]});

// ---------- Chapter 4: Histograms ----------
const HC=()=>{const b=[0];const ws=shuf([5,5,10,10,20,15]).slice(0,4);ws.forEach(w=>b.push(b[b.length-1]+w));return b};
add("C:4:0",L=>{const b=HC(),f=b.slice(1).map((v,i)=>{const w=v-b[i];return w*pick([.4,.6,.8,1,1.2,1.4,1.6,2,2.4,3])}).map(x=>rd(x,0));const fd=f.map((v,i)=>v/(b[i+1]-b[i]));const lab=f.map((_,i)=>`${b[i]} ≤ x < ${b[i+1]}`);
 if(!L){const i=r(0,3),w=b[i+1]-b[i];return[`The class ${lab[i]} has frequency ${f[i]}. Find its frequency density, to 3 significant figures where needed.`,String(+sf(fd[i],3)),[sf(f[i]*w,3),sf(w/f[i],3),sf(f[i]/b[i+1],3)]]}
 if(new Set(fd.map(v=>rd(v,3))).size<4)return G["C:4:0"][0](1);const mx=fd.indexOf(Math.max(...fd));
 return[`Classes: ${lab.join(", ")} | Frequencies: ${f.join(", ")}. Which class has the tallest bar on a histogram?`,lab[mx],others(lab,lab[mx])]});
add("C:4:1",L=>{if(!L){const a=r(0,6)*5,w=pick([5,10,15,20,25]),d=pick([.4,.8,1.2,1.6,2.4,3.2,3.6,4]);const f=rd(d*w,1);return[`On a histogram, the bar for ${a} ≤ x < ${a+w} has frequency density ${d}. Find the frequency.`,cm(f),[cm(rd(w/d,1)),cm(d),cm(rd(d*w+w,1))]]}
 const w1=pick([5,10]),k=pick([.2,.4,.5]),h1=r(3,9),f1=h1*w1*k,w2=pick([15,20,30]),h2=r(1,6),f2=h2*w2*k;if(f1%1||f2%1)return G["C:4:1"][0](1);
 return[`On a histogram, the bar for 10 ≤ x < ${10+w1} is ${h1} cm tall and represents ${f1} people. The bar for ${10+w1} ≤ x < ${10+w1+w2} is ${h2} cm tall. How many people does it represent?`,cm(f2),[cm(rd(h2*f1/h1,1)),cm(f2*2),cm(rd(f2/2,1))]]});
add("C:4:2",L=>{const b=[0,10,20,40,60],fd=b.slice(1).map(()=>pick([.5,1,1.5,2,2.5,3])),f=fd.map((d,i)=>d*(b[i+1]-b[i]));
 const lab=f.map((_,i)=>`${b[i]} ≤ t < ${b[i+1]}`);
 if(!L){const i=r(0,3);return[`Times t (s): ${lab.join(", ")} | Frequency densities: ${fd.join(", ")}. How many people took ${b[i]} s or more but less than ${b[i+1]} s?`,cm(f[i]),[cm(fd[i]),cm(f[i]*2),cm(rd(fd[i]*10,1))]]}
 const lo=pick([5,15]),hi=pick([30,50]),est=fd[lo<10?0:1]*((lo<10?10:20)-lo)+sum(f.slice(lo<10?1:2,hi<40?2:3))+fd[hi<40?2:3]*(hi-(hi<40?20:40));
 return[`Times t (s): ${lab.join(", ")} | Frequency densities: ${fd.join(", ")}. Estimate how many people took between ${lo} s and ${hi} s.`,cm(rd(est,1)),[cm(rd(est+fd[2]*5,1)),cm(rd(est-fd[0]*5,1)),cm(rd(sum(f)/2,1))]]});

// ---------- Chapter 5: Borrowing money ----------
add("C:5:0",L=>{const P=r(10,200)*50,R=pick([1.5,2,2.5,3,3.5,4,4.5,5,6]),n=r(2,6),I=P*R*n/100;
 if(!L)return[`Find the simple interest on ${gbp0(P)} at ${R}% per year for ${n} years.`,gbp(I),[gbp(P*R/100),gbp(P*((1+R/100)**n-1)),gbp(P+I)]];
 return Math.random()<.5?[`${gbp0(P)} earns ${gbp(I)} simple interest in ${n} years. Find the annual interest rate.`,R+"%",[rd(R*n,2)+"%",rd(I/P*100,2)+"%",(R+.5)+"%"]]:[`How many years does it take ${gbp0(P)} to earn ${gbp(I)} simple interest at ${R}% per year?`,n+" years",[(n+1)+" years",Math.max(1,n-1)+" years",(n+2)+" years"]]});
add("C:5:1",L=>{const P=r(10,200)*100,R=pick([1.8,2.2,2.5,3,3.4,3.75,4,4.5,5.2]);
 if(!L){const n=r(2,8),A=P*(1+R/100)**n;return[`${gbp0(P)} is invested at ${R}% per year compound interest. Find the value after ${n} years.`,gbp(A),[gbp(P*(1+R*n/100)),gbp(A-P),gbp(P*(1+R/100)**(n+1))]]}
 if(Math.random()<.5){const T=Math.ceil(P*pick([1.2,1.3,1.5])/100)*100;let n=0,A=P;while(A<T){A*=1+R/100;n++}return[`${gbp0(P)} is invested at ${R}% per year compound interest. After how many whole years will it first be worth more than ${gbp0(T)}?`,n+" years",[(n-1)+" years",(n+1)+" years",Math.ceil((T-P)/(P*R/100))+" years"]]}
 const n=r(2,5),A=P*(1+R/1200)**(12*n);return[`${gbp0(P)} is invested at ${R}% per year, compounded monthly. Find the value after ${n} years.`,gbp(A),[gbp(P*(1+R/100)**n),gbp(P*(1+R/100)**(12*n)),gbp(P*(1+R/1200)**n)]]});
add("C:5:2",L=>{if(!L){const R=pick([2.4,3,3.6,4.2,4.8,5.4,6]),a=((1+R/1200)**12-1)*100;return[`A savings account pays ${R}% a year, with interest added monthly. Find the AER, to 2 decimal places.`,pc(a,2),[pc(R,2),pc(R/12,2),pc(a+.1,2)]]}
 const i=pick([.9,1.1,1.25,1.5,1.75,1.9,2.2]),a=((1+i/100)**12-1)*100;return[`A credit card charges ${i}% interest per month. Find the equivalent annual rate, to 1 decimal place.`,pc(a,1),[pc(i*12,1),pc(a+1,1),pc((1+i/100)**10*100-100,1)]]});
add("C:5:3",L=>{const C=r(30,150)*10,dep=Math.round(C*pick([.1,.15,.2,.25])),n=pick([12,18,24,36]),m=rd((C-dep)*pick([1.08,1.12,1.15,1.2,1.25])/n,2),T=dep+n*m;
 if(!L)return[`A sofa costs ${gbp0(C)} cash, or a deposit of ${gbp0(dep)} and ${n} monthly payments of ${gbp(m)}. How much extra does credit cost?`,gbp(T-C),[gbp(T),gbp(n*m-C),gbp(T-C+dep)]];
 return[`A laptop costs ${gbp0(C)} cash, or a deposit of ${gbp0(dep)} and ${n} monthly payments of ${gbp(m)}. Find the extra cost of credit as a percentage of the cash price, to 1 decimal place.`,pc((T-C)/C*100,1),[pc((T-C)/T*100,1),pc((T-C)/(C-dep)*100,1),pc((T-C)/C*100/(n/12),1)]]});
add("C:5:4",L=>{const B=r(20,100)*100,i=pick([.5,.75,.8,1,1.2,1.5]),R=r(Math.ceil(B*i/100/50)+2,20)*50,k=L?3:2;let b=B;const s=[];for(let j=0;j<k;j++){b=rd(b*(1+i/100),2)-R;b=rd(b,2);s.push(b)}
 return[`${gbp0(B)} is borrowed at ${i}% interest per month. Interest is added each month, then a repayment of ${gbp0(R)} is made. Find the balance after ${k} months (round to the nearest penny each month).`,gbp(b),[gbp(B-k*R),gbp(B*(1+i/100)**k-R),gbp(B*(1+k*i/100)-k*R)]]});

// ---------- Chapter 6: Budgeting ----------
add("C:6:0",L=>{const inc=r(140,260)*10,ex={rent:r(50,90)*10,food:r(15,35)*10,travel:r(6,18)*10,phone:r(15,45),bills:r(8,20)*10};
 if(!L){const s=sum(Object.values(ex)),left=inc-s;return[`Monthly income ${gbp0(inc)}. Spending: rent ${gbp0(ex.rent)}, food ${gbp0(ex.food)}, travel ${gbp0(ex.travel)}, phone ${gbp0(ex.phone)}, bills ${gbp0(ex.bills)}. How much is left each month?`,(left<0?"−":"")+gbp(Math.abs(left)),[gbp(Math.abs(left)+ex.phone),gbp(s),gbp(Math.abs(left-ex.bills))]]}
 const fw=r(45,90),tw=r(15,40),fm=fw*52/12+tw*52/12,left=inc-ex.rent-ex.bills-fm;return[`Monthly income ${gbp0(inc)}. Rent is ${gbp0(ex.rent)} a month and bills ${gbp0(ex.bills)} a month. Food costs ${gbp0(fw)} a week and travel ${gbp0(tw)} a week. How much is left each month? (Use 52 weeks in a year.)`,(left<0?"−":"")+gbp(Math.abs(left)),[gbp(Math.abs(inc-ex.rent-ex.bills-4*(fw+tw))),gbp(Math.abs(inc-ex.rent-ex.bills-fw-tw)),gbp(Math.abs(left+fw))]]});
add("C:6:1",L=>{for(;;){const item=pick([["cereal","g",[375,500,750,1000]],["rice","g",[500,1000,2000]],["juice","ml",[750,1000,1500,2000]],["washing powder","g",[800,1300,2000]]]);
 const[sa,sb]=shuf(item[2]).slice(0,2),pa=r(80,400),pb=Math.round(pa*sb/sa*(.85+Math.random()*.3));const ua=pa/sa*100,ub=pb/sb*100;if(Math.abs(ua-ub)<.3)continue;
 if(!L){const best=ua<ub?"A":"B",bu=dp(Math.min(ua,ub),1),wu=dp(Math.max(ua,ub),1),u=item[1]=="g"?"100 g":"100 ml";
  return[`${item[0][0].toUpperCase()+item[0].slice(1)}: Pack A is ${sa} ${item[1]} for ${pa}p, Pack B is ${sb} ${item[1]} for ${pb}p. Which is better value?`,`Pack ${best} (${bu}p per ${u})`,[`Pack ${best=="A"?"B":"A"} (${wu}p per ${u})`,`Pack ${best=="A"?"B":"A"} (${bu}p per ${u})`,`Pack ${best} (${wu}p per ${u})`]]}
 const n=pick([3,4]),pay=n-1,u=pa*pay/(n*sa)*100;return[`Pack A of ${item[0]} is ${sa} ${item[1]} for ${pa}p and is on offer "${n} for the price of ${pay}". Find the cost per 100 ${item[1]} with the offer, to 1 decimal place.`,dp(u,1)+"p",[dp(pa/sa*100,1)+"p",dp(pa*n/(pay*sa)*100,1)+"p",dp(u*1.1,1)+"p"]]}});
add("C:6:2",L=>{const h=r(210,300)*.05,b=pick([35,37,37.5,38,40]);
 if(!L){const o=r(2,8),p=h*b+1.5*h*o;return[`Ali earns ${gbp(h)} an hour for a ${b}-hour week, and time and a half for overtime. One week he works ${b+o} hours. Find his pay.`,gbp(p),[gbp(h*(b+o)),gbp(h*b+2*h*o),gbp(h*b+.5*h*o)]]}
 if(Math.random()<.5){const S=r(22,45)*1000,hr=S/(52*b);return[`Jo earns ${gbp0(S)} a year and works ${b} hours a week for 52 weeks. Find her hourly rate.`,gbp(hr),[gbp(S/(48*b)),gbp(S/52/40),gbp(S/(12*b*4))]]}
 const o1=r(2,6),o2=r(2,5),p=h*b+1.5*h*o1+2*h*o2;return[`Kate earns ${gbp(h)} an hour for ${b} hours, time and a half for weekday overtime and double time on Sundays. She does ${o1} hours weekday overtime and ${o2} hours on Sunday. Find her pay.`,gbp(p),[gbp(h*(b+o1+o2)),gbp(h*b+1.5*h*(o1+o2)),gbp(h*b+2*h*(o1+o2))]]});
add("C:6:3",L=>{const cur=pick([["euros","€",1.12,1.2],["US dollars","$",1.22,1.32],["Swiss francs","CHF ",1.08,1.16]]),rate=rd(cur[2]+Math.random()*(cur[3]-cur[2]),2),P=r(4,60)*25;
 if(!L)return[`£1 = ${cur[1]}${rate.toFixed(2)}. Change ${gbp0(P)} into ${cur[0]}.`,cur[1]+dp(P*rate,2),[cur[1]+dp(P/rate,2),cur[1]+dp(P*rate*1.1,2),cur[1]+dp(P+rate,2)]];
 if(Math.random()<.5){const c=pick([1.5,2,2.5,3]),v=P*(1-c/100)*rate;return[`£1 = ${cur[1]}${rate.toFixed(2)}. A bureau takes ${c}% commission before changing ${gbp0(P)} into ${cur[0]}. How much is received?`,cur[1]+dp(v,2),[cur[1]+dp(P*rate,2),cur[1]+dp(P*rate-c,2),cur[1]+dp(P*(1-c/100)/rate,2)]]}
 const E=r(8,80)*10;return[`£1 = ${cur[1]}${rate.toFixed(2)}. Change ${cur[1]}${E} back into pounds.`,gbp(E/rate),[gbp(E*rate),gbp(E/rate+5),gbp(E-rate)]]});

// ---------- Chapter 7: Taxation ----------
const PA=12570,BR=37700,HT=PA+BR,TXT="Personal allowance £12,570; basic rate 20% on the next £37,700; higher rate 40% above £50,270.",NIT="National Insurance: 8% on annual earnings between £12,570 and £50,270, and 2% above £50,270.";
const tax=S=>Math.min(Math.max(S-PA,0),BR)*.2+Math.max(S-HT,0)*.4,ni=S=>Math.min(Math.max(S-PA,0),BR)*.08+Math.max(S-HT,0)*.02;
add("C:7:0",L=>{const S=L?r(520,950)*100:r(150,500)*100,t=tax(S);return[`${TXT} Find the income tax on a salary of ${gbp0(S)}.`,gbp(t),[gbp(S*.2),gbp((S-PA)*(L?.4:.2)-(L?0:PA*.02)),gbp(L?(S-PA)*.2:(S-PA)*.4)].filter(x=>x!=gbp(t))]});
add("C:7:1",L=>{const S=L?r(520,950)*100:r(150,500)*100,t=ni(S);return[`${NIT} Find the National Insurance on a salary of ${gbp0(S)}.`,gbp(t),[gbp(S*.08),gbp((S-PA)*.08),gbp(L?(S-PA)*.02:(S-PA)*.12)].filter(x=>x!=gbp(t))]});
add("C:7:2",L=>{const p=r(20,900)+pick([0,.5,.99]);if(!L)return[`A TV costs ${gbp(p)} before VAT at 20%. Find the price including VAT.`,gbp(p*1.2),[gbp(p*.2),gbp(p*1.02),gbp(p/0.8)]];
 const q=rd(p*1.2,2);return Math.random()<.5?[`A bike costs ${gbp(q)} including VAT at 20%. Find the price before VAT.`,gbp(q/1.2),[gbp(q*.8),gbp(q-20),gbp(q*.2)]]:[`A bike costs ${gbp(q)} including VAT at 20%. How much of this is VAT?`,gbp(q/6),[gbp(q*.2),gbp(q*.8),gbp(q/5)]]});
add("C:7:3",L=>{const S=L?r(520,950)*100:r(150,500)*100,net=S-tax(S)-ni(S);return L?[`${TXT} ${NIT} Find the monthly take-home pay on a salary of ${gbp0(S)}.`,gbp(net/12),[gbp((S-tax(S))/12),gbp((S-(S-PA)*.28)/12),gbp(net/52)]]:[`${TXT} ${NIT} Find the annual take-home pay on a salary of ${gbp0(S)}.`,gbp(net),[gbp(S-tax(S)),gbp(S*.72),gbp(S-ni(S))]]});

// ---------- Chapter 8: Student loans ----------
const SLT=28470,SLTX="Plan 2 student loan: repay 9% of income above £28,470 a year.";
add("C:8:0",L=>{if(!L){const S=r(290,600)*100,y=.09*(S-SLT);return[`${SLTX} How much does someone earning ${gbp0(S)} repay in a year?`,gbp(y),[gbp(.09*S),gbp(y/12),gbp(.9*(S-SLT))]]}
 if(Math.random()<.5){const S=r(290,600)*100,m=.09*(S-SLT)/12;return[`${SLTX} How much does someone earning ${gbp0(S)} repay each month?`,gbp(m),[gbp(.09*S/12),gbp(.09*(S-SLT)),gbp(.09*(S-SLT)/52)]]}
 const A=r(240,400)*100,B=A+r(40,120)*100,d=.09*(B-Math.max(A,SLT));return[`${SLTX} Ellie's salary rises from ${gbp0(A)} to ${gbp0(B)}. How much more does she repay each year?`,gbp(d),[gbp(.09*(B-A)),gbp(.09*B-.09*A+.09*SLT),gbp(.09*(B-SLT))].filter(x=>x!=gbp(d))]});
add("C:8:1",L=>{const B=r(30,70)*1000+r(0,9)*100,R=pick([4.3,5.5,6.2,7.1,7.3,7.6]);
 if(!L)return[`A student loan balance is ${gbp0(B)}. Interest of ${R}% is added for one year. How much interest is added?`,gbp(B*R/100),[gbp(B*(1+R/100)),gbp(B*R/1200),gbp(B*R/10)]];
 if(Math.random()<.5){const n=r(2,4),A=B*(1+R/100)**n;return[`A student loan of ${gbp0(B)} grows at ${R}% compound interest a year with no repayments. Find the balance after ${n} years.`,gbp(A),[gbp(B*(1+R*n/100)),gbp(A-B),gbp(B*(1+R/100)**(n-1))]]}
 const P=r(5,40)*50,nb=B*(1+R/100)-P;return[`A student loan balance is ${gbp0(B)}. At the end of the year, ${R}% interest is added and then the year's repayments of ${gbp0(P)} are taken off. Find the new balance.`,gbp(nb),[gbp((B-P)*(1+R/100)),gbp(B-P),gbp(B*R/100-P)]]});
add("C:8:2",L=>{const S=r(320,650)*100,a=.09*(S-SLT),b=.06*(S-21000);
 return L?[`${SLTX} Postgraduate loan: repay 6% of income above £21,000 a year. Sam has both loans and earns ${gbp0(S)}. Find his total monthly repayment.`,gbp((a+b)/12),[gbp(.15*(S-SLT)/12),gbp((a+b)),gbp(.15*(S-21000)/12)]]:[`Postgraduate loan: repay 6% of income above £21,000 a year. How much does someone earning ${gbp0(S)} repay in a year?`,gbp(b),[gbp(.06*S),gbp(b/12),gbp(.09*(S-21000))]]});

// ---------- Chapter 9: Percentage change ----------
add("C:9:0",L=>{const P=r(20,800)*5,p=pick([3,4,5,7.5,8,12,15,17.5,22,35]),up=Math.random()<.5;
 if(!L){const v=P*(1+(up?p:-p)/100);return[`${up?"Increase":"Decrease"} ${gbp0(P)} by ${p}%.`,gbp(v),[gbp(P*p/100),gbp(P*(1+(up?-p:p)/100)),gbp(P+(up?p:-p))]]}
 const q=pick([5,10,15,20,25]),v=P*(1+p/100)*(1-q/100);return[`A price of ${gbp0(P)} rises by ${p}% and then falls by ${q}%. Find the final price.`,gbp(v),[gbp(P*(1+(p-q)/100)),gbp(P*(1-p/100)*(1+q/100)),gbp(P*(1+p/100)-q)]]});
add("C:9:1",L=>{const a=r(20,900),b=Math.max(1,a+pick([-1,1])*r(Math.ceil(a*.03),Math.ceil(a*.6))),ch=(b-a)/a*100,ctx=pick(["The number of members of a club","The price of a ticket in pounds","A town's average house price in thousands of pounds","The number of visitors to a museum each day"]);
 if(!L)return[`${ctx} changes from ${a} to ${b}. Find the percentage change, to 1 decimal place.`,(ch<0?"−":"+")+pc(Math.abs(ch)),[(ch<0?"−":"+")+pc(Math.abs((b-a)/b*100)),(ch<0?"+":"−")+pc(Math.abs(ch)),(ch<0?"−":"+")+pc(Math.abs(b-a))]];
 const c=r(20,300),s=rd(c*(1+pick([-1,1])*r(5,60)/100),2),pr=(s-c)/c*100;return[`A trader buys an item for ${gbp0(c)} and sells it for ${gbp(s)}. Find the percentage ${pr<0?"loss":"profit"}, to 1 decimal place.`,pc(Math.abs(pr)),[pc(Math.abs((s-c)/s*100)),pc(Math.abs(s-c)),pc(s/c*100)]]});
add("C:9:2",L=>{const p=pick([5,10,15,20,25,30,40]),o=r(4,200)*(p%10?20:10),up=L?Math.random()<.5:true,n=rd(o*(1+(up?p:-p)/100),2);
 return[`After a ${p}% ${up?"increase":"decrease"}, a price is ${gbp(n)}. Find the original price.`,gbp(o),[gbp(n*(1-(up?p:-p)/100)),gbp(n-(up?p:-p)),gbp(n/(1-(up?p:-p)/100)*(up?1:1.02))]]});
add("C:9:3",L=>{const V=r(40,300)*100,p=pick([8,10,12,15,18,20,25]),n=r(2,6);
 if(!L)return[`A car worth ${gbp0(V)} loses ${p}% of its value each year. Find its value after ${n} years.`,gbp(V*(1-p/100)**n),[gbp(V*(1-p*n/100)),gbp(V*(p/100)**n),gbp(V*(1-p/100)**(n-1))]];
 const a=pick([10,20,25,30,40,50]),b=pick([10,20,25,30,40,50]),o=((1+a/100)*(1-b/100)-1)*100;if(Math.abs(o)<.05)return G["C:9:3"][0](1);
 return[`A share price rises by ${a}% and then falls by ${b}%. Find the overall percentage change.`,(o<0?"−":"+")+pc(Math.abs(o)),[(a-b<0?"−":"+")+pc(Math.abs(a-b)),(o<0?"+":"−")+pc(Math.abs(o)),(o<0?"−":"+")+pc(Math.abs(o)+a*b/100)].filter(x=>x!=(o<0?"−":"+")+pc(Math.abs(o)))]});
add("C:9:4",L=>{const a=rd(r(30,400)/10,1),b=rd(a+pick([-1,1])*r(5,Math.min(150,Math.floor(a*6)))/10,1);if(b<=0||a==b)return G["C:9:4"][0](L);
 const pp=rd(b-a,1),ch=(b-a)/a*100,w=pick(["unemployment rate","interest rate","percentage of students passing","turnout"]);
 if(!L)return[`The ${w} changes from ${a}% to ${b}%. What is the change in percentage points?`,`${pp<0?"−":"+"}${Math.abs(pp).toFixed(1)} percentage points`,[`${pp<0?"−":"+"}${Math.abs(ch).toFixed(1)} percentage points`,`${pp<0?"+":"−"}${Math.abs(pp).toFixed(1)} percentage points`,`${pp<0?"−":"+"}${(Math.abs(pp)/2).toFixed(1)} percentage points`]];
 return[`The ${w} changes from ${a}% to ${b}%. Find the percentage change, to 1 decimal place.`,(ch<0?"−":"+")+pc(Math.abs(ch)),[(ch<0?"−":"+")+pc(Math.abs(pp)),(ch<0?"−":"+")+pc(Math.abs((b-a)/b*100)),(ch<0?"+":"−")+pc(Math.abs(ch))]]});

// ---------- Chapter 10: Modelling and estimation ----------
add("C:10:0",L=>{const T=[
()=>{const b=r(60,80);return[`A heart beats about ${b} times a minute. Estimate how many times it beats in a year.`,b*60*24*365]},
()=>{const a=r(70,90);return[`Estimate the number of seconds in a ${a}-year lifetime (use 365 days a year).`,a*365*24*3600]},
()=>{const l=r(20,50),w=r(8,25),d=pick([1.2,1.5,1.8,2]);return[`A swimming pool is ${l} m long, ${w} m wide and ${d} m deep. Estimate how many litres of water it holds (1 m^{3} = 1000 litres).`,l*w*d*1000]},
()=>{const c=pick([2,3,4]),p=pick([60,65,67,70]);return[`Assume ${p} million people in the UK each drink ${c} cups of tea a day. Estimate the number of cups drunk in a year.`,p*1e6*c*365]},
()=>{const s=r(5,8),h=pick([8,10,12]);return[`A tap drips ${s} times a minute and each drip is 0.05 ml. Estimate the litres wasted in a year if it drips ${h} hours a day.`,s*.05*60*h*365/1000]},
()=>{const n=r(25,35),k=r(25,40);return[`A library has ${n} shelving units, each with 6 shelves holding about ${k} books. Estimate the number of books.`,n*6*k]}];
 const L_=L?T.slice(2):T.slice(0,4),[q,v]=pick(L_)();return[q+" Give your answer in standard form to 2 significant figures.",stdf(v),[stdf(v*10),stdf(v/10),stdf(v*pick([2,3,.5]))]]});
add("C:10:1",L=>{if(!L){if(Math.random()<.5){const k=pick([36,54,72,90,108,126]);return[`Convert ${k} km/h into m/s.`,cm(k/3.6)+" m/s",[cm(rd(k*3.6,1))+" m/s",cm(rd(k/60,2))+" m/s",cm(k/3.6+5)+" m/s"]]}
  const m=r(25,70);return[`A car does ${m} miles per gallon. 1 mile = 1.609 km and 1 gallon = 4.546 litres. Find its fuel use in km per litre, to 1 decimal place.`,dp(m*1.609/4.546,1)+" km per litre",[dp(m*4.546/1.609,1)+" km per litre",dp(m/4.546,1)+" km per litre",dp(m*1.609,1)+" km per litre"]]}
 const d=r(50,400),mpg=r(35,60),p=rd(r(130,170)/100,2),c=d/mpg*4.546*p;return[`A journey is ${d} miles. The car does ${mpg} miles per gallon and fuel costs £${p.toFixed(2)} a litre (1 gallon = 4.546 litres). Find the fuel cost.`,gbp(c),[gbp(d/mpg*p),gbp(d*mpg/4.546*p/100),gbp(d/mpg*p*4.546/1.609)]]});
add("C:10:2",L=>{if(!L){const t=pick([[1,"cm"],[0,"kg"],[2,"m"]]),x=t[0]?rd(r(10,999)/10**t[0],t[0]):r(5,200)*1,h=.5/10**t[0];
  return[`A length is ${x.toFixed(t[0])} ${t[1]}, correct to ${t[0]?t[0]+" decimal place"+(t[0]>1?"s":""):"the nearest whole number"}. Write down the error interval.`,`${dp(x-h,t[0]+1)} ≤ x < ${dp(x+h,t[0]+1)}`,[`${dp(x-2*h,t[0]+1)} ≤ x < ${dp(x+2*h,t[0]+1)}`,`${dp(x-h,t[0]+1)} < x ≤ ${dp(x+h,t[0]+1)}`,`${dp(x-h/5,t[0]+2)} ≤ x < ${dp(x+h/5,t[0]+2)}`]]}
 if(Math.random()<.5){const l=r(20,90),w=r(10,60);return[`A rectangle is ${l} cm by ${w} cm, each to the nearest cm. Find the upper bound of its area.`,cm((l+.5)*(w+.5))+" cm^{2}",[cm(l*w)+" cm^{2}",cm((l+1)*(w+1))+" cm^{2}",cm((l-.5)*(w-.5))+" cm^{2}"]]}
 const d=r(100,400),t=r(10,40);return[`A cyclist travels ${d} km (to the nearest km) in ${t} hours (to the nearest hour). Find the upper bound of the average speed, to 2 decimal places.`,dp((d+.5)/(t-.5),2)+" km/h",[dp((d+.5)/(t+.5),2)+" km/h",dp(d/t,2)+" km/h",dp((d-.5)/(t-.5),2)+" km/h"]]});
add("C:10:3",L=>{const rr=rd(r(25,50)/10,1),h=rd(r(80,160)/10,1);
 if(!L){const V=Math.PI*rr*rr*h;return[`A can is a cylinder with radius ${rr} cm and height ${h} cm. Find its volume in cm^{3}, to 3 significant figures.`,sf(V,3)+" cm^{3}",[sf(2*Math.PI*rr*h,3)+" cm^{3}",sf(Math.PI*rr*h,3)+" cm^{3}",sf(Math.PI*(2*rr)**2*h,3)+" cm^{3}"]]}
 if(Math.random()<.5){const A=2*Math.PI*rr*rr+2*Math.PI*rr*h;return[`A closed can has radius ${rr} cm and height ${h} cm. Find the area of metal needed, to 3 significant figures.`,sf(A,3)+" cm^{2}",[sf(2*Math.PI*rr*h,3)+" cm^{2}",sf(Math.PI*rr*rr+2*Math.PI*rr*h,3)+" cm^{2}",sf(Math.PI*rr*rr*h,3)+" cm^{2}"]]}
 const V=pick([250,330,440,500]),hh=V/(Math.PI*rr*rr);return[`A drinks can must hold ${V} ml and has radius ${rr} cm. Find the height it needs, to 1 decimal place (1 ml = 1 cm^{3}).`,dp(hh,1)+" cm",[dp(V/(2*Math.PI*rr),1)+" cm",dp(V/(Math.PI*rr),1)+" cm",dp(hh+1,1)+" cm"]]});
add("C:10:4",L=>{const P=r(20,90)*1000,g=pick([1.5,2,2.5,3,4,5]);
 if(!L){const n=r(3,10),v=P*(1+g/100)**n;return[`A town has ${cm(P)} people and its population grows by ${g}% a year. Estimate the population after ${n} years, to the nearest hundred.`,cm(Math.round(v/100)*100),[cm(Math.round(P*(1+g*n/100)/100)*100),cm(Math.round(P*(1+g/100)**(n+1)/100)*100),cm(Math.round(P*g*n/100/100)*100)]]}
 let n=0,v=P;while(v<2*P){v*=1+g/100;n++}return[`A town's population grows by ${g}% a year. After how many whole years will it first have doubled?`,n+" years",[Math.round(100/g)+" years",(n-1)+" years",(n+2)+" years"].filter(x=>x!=n+" years")]});

// ---------- Chapter 11: Critical analysis ----------
add("C:11:0",L=>{const R=pick([["boys","girls"],["Year 12","Year 13"],["adults","children"]]),C=pick([["walk","bus","car"],["tea","coffee","juice"],["football","netball","swimming"]]),T=R.map(()=>C.map(()=>r(8,60)));
 const tab=`${R.map((x,i)=>`${x[0].toUpperCase()+x.slice(1)}: ${C.map((c,j)=>`${c} ${T[i][j]}`).join(", ")}`).join(" | ")}`,i=r(0,1),j=r(0,2);
 if(!L){const v=T[i][j]/sum(T[i])*100,col=T[i][j]/(T[0][j]+T[1][j])*100;return[`Survey results. ${tab}. What percentage of the ${R[i]} chose ${C[j]}? Give your answer to 1 decimal place.`,pc(v),[pc(col),pc(T[i][j]/sum(T.flat())*100),pc(v+2)]]}
 const v=T[i][j]/(T[0][j]+T[1][j])*100,row=T[i][j]/sum(T[i])*100;return[`Survey results. ${tab}. What percentage of those who chose ${C[j]} were ${R[i]}? Give your answer to 1 decimal place.`,pc(v),[pc(row),pc(T[i][j]/sum(T.flat())*100),pc(100-v)]]});
add("C:11:1",L=>{const w=pick(["road accidents","burglaries","hospital admissions","new businesses"]);
 if(!L){const p=r(20,300)*1000+r(0,9)*100,n=r(40,900),v=n/p*1000;return[`A town of ${cm(p)} people had ${n} ${w} last year. Find the rate per 1000 people, to 2 decimal places.`,dp(v,2),[dp(n/p*100,2),dp(p/n,2),dp(v*10,2)]]}
 for(;;){const pa=r(20,90)*1000,pb=r(100,400)*1000,na=r(30,400),nb=r(100,1200),ra=na/pa*1000,rb=nb/pb*1000;if(Math.abs(ra-rb)<.2)continue;
  const hi=ra>rb?"Town A":"Town B",lo=ra>rb?"Town B":"Town A",rh=dp(Math.max(ra,rb),2),rl=dp(Math.min(ra,rb),2);
  return[`Town A: ${na} ${w}, population ${cm(pa)}. Town B: ${nb} ${w}, population ${cm(pb)}. Which town has the higher rate per 1000 people?`,`${hi} (${rh} per 1000)`,[`${lo} (${rh} per 1000)`,`${lo} (${rl} per 1000)`,`${hi} (${rl} per 1000)`]]}});
add("C:11:2",L=>{const T=[
()=>{const a=r(2,6);return[`A headline says "Sales up 100%!" Sales rose from ${a} to ${2*a} items. Explain why the headline could be misleading.`,`The actual numbers are very small, so a 100% increase is only ${a} more items`]},
()=>[`A bar chart of profits has a vertical axis starting at £95,000 rather than £0. Explain why this is misleading.`,`Starting the axis above zero makes small differences between bars look much bigger`],
()=>{const n=r(8,15);return[`An advert says "9 out of 10 dentists recommend Brite toothpaste", based on asking ${n} dentists. Give two reasons to doubt the claim.`,`The sample of ${n} is very small, and we don't know how the dentists were chosen or what they were asked`]},
()=>[`A website poll finds that 80% of visitors support a new cycle lane. Explain why this may not represent the whole town.`,`Website visitors choose to take part (self-selected), so they are not a random or representative sample`],
()=>[`A report says ice cream sales and drownings rise together, so ice cream causes drowning. Comment on this conclusion.`,`Correlation does not mean causation; both rise in hot weather (a third variable)`]];return pick(T)()});

// ---------- Chapter 12: Normal distribution ----------
const NCTX=[["The mass of a bag of flour","g",[495,510],[2,6]],["The time to complete a puzzle","s",[60,120],[8,15]],["The height of a sunflower","cm",[150,200],[10,20]],["The length of a bolt","mm",[40,60],[1,3]],["A test score","marks",[50,70],[8,14]]];
add("C:12:0",L=>{const c=pick(NCTX),m=r(...c[2]),s=r(...c[3]);
 if(!L){const k=pick([[1,"68%"],[2,"95%"],[3,"99.7%"]]);return[`${c[0]} is normally distributed with mean ${m} ${c[1]} and standard deviation ${s} ${c[1]}. Between which two values do about ${k[1]} of values lie?`,`${m-k[0]*s} and ${m+k[0]*s} ${c[1]}`,[1,2,3].filter(x=>x!=k[0]).map(x=>`${m-x*s} and ${m+x*s} ${c[1]}`).concat([`${m-k[0]*s*2} and ${m+k[0]*s*2} ${c[1]}`])]}
 const k=pick([[1,"16%","above"],[2,"2.5%","above"],[-1,"16%","below"],[-2,"2.5%","below"],[3,"0.15%","above"]]),v=m+k[0]*s;return[`${c[0]} is normally distributed with mean ${m} ${c[1]} and standard deviation ${s} ${c[1]}. About what percentage of values are ${k[2]} ${v} ${c[1]}?`,k[1],others(["16%","2.5%","0.15%","34%","5%","32%"],k[1])]});
add("C:12:1",L=>{const c=pick(NCTX),m=r(...c[2]),s=r(...c[3]);
 if(!L){const a=m+pick([-1,1])*rd(r(3,25)/10*s,0),b=Math.random()<.5,p=b?Phi((a-m)/s):1-Phi((a-m)/s);if(Math.abs(a-m)<.5)return G["C:12:1"][0](0);
  return[`${c[0]}, X, is normally distributed with mean ${m} ${c[1]} and standard deviation ${s} ${c[1]}. Find P(X ${b?"<":">"} ${a}), to 3 significant figures.`,sf(p,3),[sf(1-p,3),sf(Math.abs((a-m)/s)/10,3),sf(Math.min(.999,p+.05),3)]]}
 let a=m-rd(r(2,20)/10*s,0),b=m+rd(r(2,20)/10*s,0);if(a==b)b++;const p=Phi((b-m)/s)-Phi((a-m)/s);return[`${c[0]}, X, is normally distributed with mean ${m} ${c[1]} and standard deviation ${s} ${c[1]}. Find P(${a} < X < ${b}), to 3 significant figures.`,sf(p,3),[sf(1-p,3),sf(Phi((b-m)/s),3),sf(Phi((b-m)/s)+Phi((a-m)/s)-1+.2,3)]]});
add("C:12:2",L=>{const c=pick(NCTX),m=r(...c[2]),s=r(...c[3]);
 if(!L){const x=m+pick([-1,1])*r(1,3*s),z=(x-m)/s;return[`${c[0]} is normally distributed with mean ${m} ${c[1]} and standard deviation ${s} ${c[1]}. Find the z-score of ${x} ${c[1]}, to 2 decimal places.`,dp(z,2),[dp(-z,2),dp((x-m)/(s*s),2),dp(x/s,2)]]}
 const z=pick([[1.645,"5%"],[1.96,"2.5%"],[2.326,"1%"]]),up=Math.random()<.5,k=up?m+z[0]*s:m-z[0]*s;return[`${c[0]} is normally distributed with mean ${m} ${c[1]} and standard deviation ${s} ${c[1]}. Given that P(Z > ${z[0]}) = ${z[1].replace("%","")/100}, find the value that only ${z[1]} of values are ${up?"above":"below"}, to 1 decimal place.`,dp(k,1)+" "+c[1],[dp(up?m-z[0]*s:m+z[0]*s,1)+" "+c[1],dp(m+(up?1:-1)*z[0]*s*s/10,1)+" "+c[1],dp(m+(up?1:-1)*2*s,1)+" "+c[1]]]});
add("C:12:3",L=>{const c=pick(NCTX),m=r(...c[2]),s=r(...c[3]),n=pick([200,250,400,500,800,1000,1200]);
 const a=m+rd(r(5,20)/10*s,0)*(L?1:pick([-1,1])),above=Math.random()<.5,p=above?1-Phi((a-m)/s):Phi((a-m)/s);
 if(!L)return[`${c[0]} is normally distributed with mean ${m} ${c[1]} and standard deviation ${s} ${c[1]}. In a batch of ${n}, how many would you expect to be ${above?"more":"less"} than ${a} ${c[1]}?`,""+Math.round(n*p),[""+Math.round(n*(1-p)),""+Math.round(n*p/2),""+Math.round(n*Math.abs(a-m)/s/10)].filter(x=>x!=""+Math.round(n*p))];
 const lo=m-rd(r(5,15)/10*s,0),pp=Phi((a-m)/s)-Phi((lo-m)/s);return[`${c[0]} is normally distributed with mean ${m} ${c[1]} and standard deviation ${s} ${c[1]}. In a batch of ${n}, how many would you expect to be between ${lo} and ${a} ${c[1]}?`,""+Math.round(n*pp),[""+Math.round(n*(1-pp)),""+Math.round(n*Phi((a-m)/s)),""+Math.round(n*(pp-.1))]]});

// ---------- Chapter 13: Confidence intervals ----------
const CCTX=[["the masses of a sample of apples","g",[80,150],[5,15]],["the times taken by a sample of runners","minutes",[25,60],[3,9]],["the lengths of a sample of fish","cm",[20,45],[2,6]],["the daily screen times of a sample of students","hours",[3,8],[1,2]]];
add("C:13:0",L=>{const c=pick(CCTX),s=r(...c[3])+(L?r(0,9)/10:0),n=pick([25,36,40,49,50,64,80,100,120]),se=s/Math.sqrt(n);return[`For ${c[0]}, the sample size is ${n} and the standard deviation is ${s} ${c[1]}. Find the standard error of the mean, to 3 significant figures.`,sf(se,3),[sf(s/n,3),sf(s*Math.sqrt(n)/100,3),sf(1.96*se,3)]]});
add("C:13:1",L=>{const c=pick(CCTX),m=rd(r(c[2][0]*10,c[2][1]*10)/10,1),s=rd(r(c[3][0]*10,c[3][1]*10)/10,1),n=pick([30,36,40,50,60,80,100]),e=1.96*s/Math.sqrt(n);
 const fmt=(a,b)=>`(${dp(a,2)}, ${dp(b,2)})`;
 if(!L)return[`The mean of ${c[0]} (size ${n}) is ${m} ${c[1]} and the standard deviation is ${s} ${c[1]}. Find a 95% confidence interval for the population mean.`,fmt(m-e,m+e),[fmt(m-1.96*s/n,m+1.96*s/n),fmt(m-1.96*s,m+1.96*s),fmt(m-s/Math.sqrt(n),m+s/Math.sqrt(n))]];
 const lo=rd(m-e,2),hi=rd(m+e,2);return[`A 95% confidence interval for a mean is (${lo.toFixed(2)}, ${hi.toFixed(2)}). Find the sample mean and the standard error, to 3 significant figures.`,`mean = ${sf((lo+hi)/2,3)}, standard error = ${sf((hi-lo)/3.92,3)}`,[`mean = ${sf((lo+hi)/2,3)}, standard error = ${sf((hi-lo)/2,3)}`,`mean = ${sf((lo+hi)/2,3)}, standard error = ${sf((hi-lo)/1.96,3)}`,`mean = ${sf(hi-lo,3)}, standard error = ${sf((hi-lo)/3.92,3)}`]]});
add("C:13:2",L=>{const s=r(3,20),n=pick([25,36,49,64,100]);
 if(!L){const w=2*1.96*s/Math.sqrt(n);return[`A sample of ${n} has standard deviation ${s}. Find the width of a 95% confidence interval for the mean, to 3 significant figures.`,sf(w,3),[sf(w/2,3),sf(2*1.96*s/n,3),sf(2*s/Math.sqrt(n),3)]]}
 const w=pick([1,2,2.5,3,4,5]),nn=Math.ceil((3.92*s/w)**2);return[`The standard deviation is ${s}. What is the smallest sample size that gives a 95% confidence interval for the mean of width at most ${w}?`,""+nn,[""+Math.ceil((1.96*s/w)**2),""+Math.ceil(3.92*s/w),""+(nn+r(5,20))]]});
add("C:13:3",L=>{const c=pick(CCTX),m=rd(r(c[2][0]*10,c[2][1]*10)/10,1),e=rd(r(5,30)/10*(c[3][0]/3),2),lo=rd(m-e,2),hi=rd(m+e,2),claim=Math.random()<.5?rd(m+pick([-1,1])*e*.5,1):rd(m+pick([-1,1])*e*1.6,1),inside=claim>lo&&claim<hi;
 return[`A 95% confidence interval for the mean of ${c[0]} is (${lo}, ${hi}) ${c[1]}. A manufacturer claims the mean is ${claim} ${c[1]}. Comment on the claim.`,inside?`${claim} is inside the interval, so there is no evidence to doubt the claim`:`${claim} is outside the interval, so there is evidence that the claim is wrong`]});

// ---------- Chapter 14: Scatter graphs ----------
const CORR=["Strong positive","Weak positive","No correlation","Weak negative","Strong negative"];
const corrData=(want)=>{for(let t=0;t<400;t++){const x=distinct(8,1,20).sort((a,b)=>a-b),sl=want.includes("positive")?r(2,4):want.includes("negative")?-r(2,4):0,noise=want.startsWith("Strong")?r(1,4):want.startsWith("Weak")?r(10,18):r(12,25);
 const base=10+noise+(sl<0?-sl*21:0),y=x.map(v=>Math.max(0,base+sl*v+r(-noise,noise))),rv=pmcc(x,y),k=Math.abs(rv)>=.8?"Strong":Math.abs(rv)>=.3&&Math.abs(rv)<=.65?"Weak":Math.abs(rv)<.15?"No":"";
 if(!k)continue;const lab=k=="No"?"No correlation":k+(rv>0?" positive":" negative");if(lab==want)return[x,y,rv]}return null};
add("C:14:0",L=>{const w=pick(CORR),d=corrData(w);if(!d)return G["C:14:0"][0](L);const[x,y]=d;
 return[`What type of correlation do these data points show? ${pairs(x,y)}`,w,others(CORR,w)]});
add("C:14:1",L=>{const ctx=pick([["temperature (°C)","ice creams sold",[8,14],[24,32]],["hours revised","test mark",[1,4],[12,20]],["age of car (years)","value",[1,2],[8,12]],["height (cm)","arm span",[150,160],[180,195]]]),a=r(...ctx[2]),b=r(...ctx[3]),inside=Math.random()<.5,x=inside?r(a+1,b-1):pick([Math.max(0,a-r(2,6)),b+r(3,12)]);
 const A=inside?"Interpolation, likely to be reliable":"Extrapolation, may be unreliable",all=["Interpolation, likely to be reliable","Interpolation, may be unreliable","Extrapolation, likely to be reliable","Extrapolation, may be unreliable"];
 return[`Data were collected for ${ctx[0]} from ${a} to ${b}. A line of best fit is used to predict ${ctx[1]} when ${ctx[0]} is ${x}. Is this interpolation or extrapolation, and is it reliable?`,A,others(all,A)]});
add("C:14:2",L=>{for(;;){const x=distinct(8,2,20).sort((a,b)=>a-b),sl=pick([2,3,-2,-3]),y=x.map(v=>60+sl*v+r(-2,2)),i=r(1,6);y[i]+=pick([-1,1])*r(18,28);if(y.some(v=>v<1))continue;
 const P=x.map((v,j)=>`(${v}, ${y[j]})`),ans=P[i];return[`Which point does not fit the pattern of the others? ${P.join(", ")}`,ans,others(P,ans)]}});
add("C:14:3",L=>{const T=[["the number of ice creams sold","the number of people with sunburn","hot, sunny weather"],["a town's number of churches","its number of crimes","population size"],["shoe size","reading ability in children","age"],["the number of firefighters at a fire","the damage caused","the size of the fire"]];const t=pick(T);
 return[`There is strong positive correlation between ${t[0]} and ${t[1]}. Explain why one does not necessarily cause the other.`,`Correlation does not imply causation; both are likely to be linked to a third variable, ${t[2]}`]});

// ---------- Chapter 15: Regression lines ----------
const RCTX=[["hours of revision, x","test mark, y","marks per hour"],["temperature in °C, x","cold drinks sold, y","drinks per °C"],["age of a car in years, x","value in £1000s, y","£1000s per year"],["advertising spend in £100s, x","sales in £1000s, y","£1000s per £100"]];
add("C:15:0",L=>{const c=pick(RCTX),a=rd(r(50,500)/10,1),b=rd(pick([-1,1])*r(5,60)/10,1),bs=b<0?` − ${Math.abs(b)}x`:` + ${b}x`;
 if(!L){const x=r(2,15),y=a+b*x;return[`The regression line of y on x is y = ${a}${bs}. Use it to estimate y when x = ${x}.`,dp(y,1),[dp(a*x+b,1),dp(a-b*x,1),dp(b*x,1)]]}
 const y=rd(a+b*r(3,15),1),x=(y-a)/b;return[`The regression line of y on x is y = ${a}${bs}. Estimate x when y = ${y}, to 1 decimal place.`,dp(x,1),[dp(a+b*y,1),dp((y+a)/b,1),dp(y/b,1)]]});
add("C:15:1",L=>{const c=pick(RCTX),a=rd(r(50,500)/10,1),b=rd(pick([-1,1])*r(5,60)/10,1),bs=b<0?` − ${Math.abs(b)}x`:` + ${b}x`;
 if(!L)return[`For ${c[0]} and ${c[1]}, the regression line is y = ${a}${bs}. By how much does y change when x increases by 1?`,`${b<0?"Decreases":"Increases"} by ${Math.abs(b)}`,[`${b<0?"Increases":"Decreases"} by ${Math.abs(b)}`,`${b<0?"Decreases":"Increases"} by ${a}`,`${b<0?"Decreases":"Increases"} by ${rd(a+b,1)}`]];
 const k=r(3,12);return[`For ${c[0]} and ${c[1]}, the regression line is y = ${a}${bs}. Estimate the change in y when x increases by ${k}.`,`${b<0?"Decrease":"Increase"} of ${dp(Math.abs(b*k),1)}`,[`${b<0?"Increase":"Decrease"} of ${dp(Math.abs(b*k),1)}`,`${b<0?"Decrease":"Increase"} of ${dp(Math.abs(a+b*k),1)}`,`${b<0?"Decrease":"Increase"} of ${dp(Math.abs(b)+k,1)}`]]});
add("C:15:2",L=>{const x=distinct(6,1,20).sort((a,b)=>a-b),b0=pick([-1,1])*r(1,5),a0=r(10,50),y=x.map(v=>a0+(b0<0?-b0*21:0)+b0*v+r(-4,4)),b=Sxy(x,y)/Sxy(x,x),a=mean(y)-b*mean(x),eq=(A,B)=>`y = ${sf(A,3)}${B<0?" − ":" + "}${sf(Math.abs(B),3)}x`;
 if(!L)return[`Find the equation of the regression line of y on x, with values to 3 significant figures: ${pairs(x,y)}`,eq(a,b),[eq(b,a),eq(mean(y)-b*mean(x)/2,b),eq(a,Sxy(x,y)/Sxy(y,y))].filter(e=>e!=eq(a,b))];
 const xp=r(x[1],x[4]);return[`Find the regression line of y on x and use it to estimate y when x = ${xp}, to 3 significant figures: ${pairs(x,y)}`,sf(a+b*xp,3),[sf(b+a*xp,3),sf(mean(y),3),sf(a+b*xp+Math.abs(b)*2,3)]]});

// ---------- Chapter 16: PMCC ----------
add("C:16:0",L=>{const n=L?8:6,x=distinct(n,1,25),sl=pick([-3,-2,-1,1,2,3]),base=15+(sl<0?-sl*26:0),y=x.map(v=>base+sl*v+r(-10,10)),rv=pmcc(x,y);
 return[`Find the product moment correlation coefficient for these data, to 3 decimal places: ${pairs(x,y)}`,dp(rv,3),[dp(-rv,3),dp(rv*rv,3),dp(Sxy(x,y)/Sxy(x,x)/10,3)].filter(v=>v!=dp(rv,3))]});
add("C:16:1",L=>{const w=pick(CORR),v=w=="Strong positive"?r(80,98)/100:w=="Weak positive"?r(30,60)/100:w=="No correlation"?pick([-1,1])*r(0,12)/100:w=="Weak negative"?-r(30,60)/100:-r(80,98)/100;
 return[`The pmcc between two variables is ${v.toFixed(2)}. What does this show?`,w=="No correlation"?"Little or no linear correlation":w+" correlation",others(CORR,w).map(x=>x=="No correlation"?"Little or no linear correlation":x+" correlation")]});
const CV1={6:.7293,7:.6694,8:.6215,9:.5822,10:.5494,12:.4973,15:.4409,20:.3783},CV2={6:.8114,7:.7545,8:.7067,9:.6664,10:.6319,12:.5760,15:.5139,20:.4438};
add("C:16:2",L=>{const n=+pick(Object.keys(CV1)),two=L&&Math.random()<.5,dir=two?0:pick([1,-1]),cv=two?CV2[n]:CV1[n],sig=Math.random()<.5,mag=sig?Math.min(.99,cv+r(2,20)/100):Math.max(.05,cv-r(2,20)/100),rv=rd((dir||pick([1,-1]))*mag,3);
 const H1=two?"ρ ≠ 0":dir>0?"ρ > 0":"ρ < 0",kind=two?"correlation":dir>0?"positive correlation":"negative correlation";
 const A=sig?`Reject H_{0}: there is evidence of ${kind}`:`Do not reject H_{0}: there is no evidence of ${kind}`;
 const W=sig?[`Do not reject H_{0}: there is no evidence of ${kind}`,`Reject H_{0}: there is no evidence of ${kind}`,`Do not reject H_{0}: there is evidence of ${kind}`]:[`Reject H_{0}: there is evidence of ${kind}`,`Do not reject H_{0}: there is evidence of ${kind}`,`Reject H_{0}: there is no evidence of ${kind}`];
 return[`A sample of ${n} pairs gives r = ${rv}. Test H_{0}: ρ = 0 against H_{1}: ${H1} at the 5% level. The critical value is ${cv}. What is the conclusion?`,A,W]});
add("C:16:3",L=>G["C:14:3"][0](L));

// Challenge lists: every generator above takes the level, so the challenge list is the same functions
for(const k in G)GC[k]=G[k];
