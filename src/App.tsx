/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ReactNode } from 'react';
import { 
  Activity, 
  Zap, 
  BrainCircuit, 
  LayoutDashboard, 
  FileSearch, 
  Settings,
  ChevronRight,
  User,
  LogOut,
  Network,
  MessageSquare,
  ShieldCheck,
  Search,
  Database,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
export type Page = 'dashboard' | 'investigation' | 'learning';

// --- Main App Component ---
export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  return (
    <div className="flex h-screen w-full bg-[var(--color-bg-deep)] overflow-hidden font-sans">
      {/* Navigation Rail */}
      <nav className="w-16 border-r border-[var(--color-border-subtle)] flex flex-col items-center py-6 gap-8 bg-[var(--color-bg-card)]">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-cyan-600 rounded-lg flex items-center justify-center neon-glow mb-4">
          <Zap className="text-white w-6 h-6 fill-white/20" />
        </div>
        
        <NavIcon 
          active={currentPage === 'dashboard'} 
          onClick={() => setCurrentPage('dashboard')} 
          icon={<LayoutDashboard className="w-5 h-5" />} 
          label="风险指挥舱" 
        />
        <NavIcon 
          active={currentPage === 'investigation'} 
          onClick={() => setCurrentPage('investigation')} 
          icon={<FileSearch className="w-5 h-5" />} 
          label="主动追证工作台" 
        />
        <NavIcon 
          active={currentPage === 'learning'} 
          onClick={() => setCurrentPage('learning')} 
          icon={<BrainCircuit className="w-5 h-5" />} 
          label="风险进化实验室" 
        />
        
        <div className="mt-auto flex flex-col gap-6">
          <button className="text-slate-500 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden">
            <User className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Header */}
        <header className="h-14 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-card)]/50 backdrop-blur-xl flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-mono tracking-widest text-slate-400 uppercase">
              AuditAI // <span className="text-white font-bold">{currentPage === 'dashboard' ? 'REALTIME_COMMAND_CENTER' : currentPage === 'investigation' ? 'PROACTIVE_EVIDENCE_PROBING' : 'PATTERN_MINING_LAB'}</span>
            </h1>
            <div className="h-1 w-1 rounded-full bg-green-500 animate-pulse ml-2" />
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full">
              <Activity className="w-3 h-3 text-violet-400 animate-pulse" />
              <span className="text-[10px] font-mono text-violet-300 font-bold uppercase">Multi-Agent 系统已接入</span>
            </div>
            <button className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors">
              <LogOut className="w-4 h-4" />
              <span className="uppercase">安全注销</span>
            </button>
          </div>
        </header>

        {/* Content Views */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {currentPage === 'dashboard' && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="h-full"
              >
                <Dashboard onInvestigate={() => setCurrentPage('investigation')} />
              </motion.div>
            )}
            {currentPage === 'investigation' && (
              <motion.div 
                key="investigation"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full"
              >
                <Investigation />
              </motion.div>
            )}
            {currentPage === 'learning' && (
              <motion.div 
                key="learning"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="h-full"
              >
                <LearningCenter />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// --- Navigation Icon ---
function NavIcon({ active, icon, onClick, label }: { active: boolean; icon: ReactNode; onClick: () => void; label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`group relative flex items-center justify-center p-3 rounded-xl transition-all duration-300 ${
        active 
          ? 'bg-violet-600/20 text-violet-400 border border-violet-500/30 neon-glow' 
          : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
      }`}
    >
      {icon}
      <div className="absolute left-16 px-2 py-1 bg-slate-900 border border-slate-800 text-[10px] text-white rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 uppercase tracking-widest font-bold">
        {label}
      </div>
    </button>
  );
}

// --- STAT CARD ---
function StatCard({ label, value, sub, trend, color }: any) {
  return (
    <div className="bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] p-4 rounded-2xl flex flex-col gap-1 hover:border-violet-500/30 transition-colors">
      <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest border-b border-white/5 pb-1 mb-2">{label}</div>
      <div className={`text-2xl font-bold tracking-tight ${color}`}>{value}</div>
      <div className="text-[10px] text-slate-400 flex items-center gap-1 uppercase font-mono">
        {trend === 'up' ? <ChevronRight className="w-3 h-3 text-red-400 -rotate-90" /> : <ChevronRight className="w-3 h-3 text-green-400 rotate-90" />}
        {sub}
      </div>
    </div>
  );
}

// --- AGENT STATUS ---
function AgentStatus({ name, role, status, load, active }: any) {
  return (
    <div className={`p-4 rounded-xl border transition-all ${active ? 'bg-violet-500/10 border-violet-500/30' : 'bg-black/20 border-white/5 opacity-60'}`}>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-bold text-white uppercase tracking-tight">{name}</span>
        <span className={`w-2 h-2 rounded-full ${active ? 'bg-green-500 animate-pulse' : 'bg-slate-700'}`} />
      </div>
      <div className="text-[9px] text-slate-500 uppercase font-mono mb-2">{role}</div>
      <div className="text-[10px] text-cyan-400 font-mono mb-3 flex items-center gap-2">
        <Activity className="w-3 h-3 opacity-50" />
        {status}
      </div>
      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${load}%` }}
          className={`h-full ${active ? 'bg-violet-400' : 'bg-slate-700'}`} 
        />
      </div>
    </div>
  );
}

// --- Page: Dashboard ---
function Dashboard({ onInvestigate }: { onInvestigate: () => void }) {
  return (
    <div className="p-6 h-full flex gap-6 overflow-hidden">
      <div className="flex-[3] flex flex-col gap-6">
        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4">
          <StatCard label="24H 风险总额" value="¥1,284,400" sub="+12.4% 环比昨日" trend="up" color="text-red-400" />
          <StatCard label="待审计强信号" value="47" sub="22个正在自动追证" trend="up" color="text-yellow-400" />
          <StatCard label="AI 自动审计结果" value="1,492" sub="节省人工 1,240 小时" trend="up" color="text-cyan-400" />
          <StatCard label="资损拦截率" value="94.2%" sub="已拦截恶意退款 2.4k" trend="up" color="text-green-400" />
        </div>

        {/* Live Stream with Signals */}
        <div className="flex-1 bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] rounded-2xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/20">
            <h2 className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest text-slate-300">
              <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '3s' }} />
              实时风险审计事件流
            </h2>
            <div className="flex gap-4 items-center">
               <div className="flex items-center gap-4 text-[10px] text-slate-600 font-mono">
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500" /> 强信号/中信号(进入主动追证)</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-500" /> 持续弱信号(进入观察池)</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-500" /> 随机弱信号(静默采样)</span>
               </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono">
            {[
              { id: 'ORD-8829', level: '强信号', type: '团伙退款套利', action: '进入主动追证流', router: '深度溯源', time: '12s ago' },
              { id: 'USR-2190', level: '中信号', type: 'IP异常漂移', action: '进入主动追证流', router: '多维验证', time: '45s ago' },
              { id: 'PAY-1102', level: '弱信号', type: '单次波动异常', action: '进入静默采样池', router: '低成本归档', time: '1m ago' },
              { id: 'USR-3341', level: '弱信号', type: '持续异常波动', action: '进入观察池', router: '滑窗衰减机制', time: '2m ago' },
              { id: 'ORD-8815', level: '强信号', type: '同指纹多账号', action: '追证分析完成', router: '自动结案', time: '3m ago' },
            ].map((item, i) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-violet-500/40 p-4 rounded-xl flex items-center justify-between transition-all cursor-pointer"
                onClick={onInvestigate}
              >
                <div className="flex items-center gap-6">
                  <div className={`w-1.5 h-12 rounded-full ${item.level === '强信号' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : item.level === '中信号' ? 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]' : item.action === '进入观察池' ? 'bg-violet-500' : 'bg-slate-700'}`} />
                  <div>
                    <div className="flex items-center gap-3">
                       <span className="text-xs font-bold text-white uppercase">{item.id}</span>
                       <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-slate-400">{item.type}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-2 flex items-center gap-4">
                       <span className={`${item.level !== '弱信号' ? 'text-violet-400' : 'text-slate-600'} font-bold uppercase`}>» {item.action}</span>
                       <span className="text-slate-600">处理策略: {item.router}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-xs font-bold ${item.level === '强信号' ? 'text-red-400' : 'text-slate-400'}`}>{item.level}</div>
                  <div className="text-[10px] text-slate-700 mt-2">{item.time}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Right - Agent Matrix */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="bg-[var(--color-bg-card)] border border-violet-500/20 rounded-2xl p-5 flex flex-col gap-4 h-full relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
             <BrainCircuit className="w-32 h-32 text-violet-400" />
          </div>
          <h2 className="text-xs font-bold flex items-center gap-2 text-violet-400 uppercase tracking-[0.2em]">
            审计 Agent 协同阵列
          </h2>
          <div className="space-y-3 flex-1 overflow-y-auto">
            <AgentStatus name="信号发现 Agent" role="特征识别与初筛" status="正在扫描跨境异常退款簇" load={32} active />
            <AgentStatus name="主动追证 Agent" role="编排与自动化取证" status="查询日志节点: SG-04" load={85} active />
            <AgentStatus name="证据护照 Agent" role="确证归集与评估" status="待命" load={0} />
            <AgentStatus name="审计决策 Agent" role="辅助决策与自动处置" status="处理任务 [ORD-8815]" load={12} active />
          </div>
          <div className="border-t border-white/5 pt-4">
             <div className="text-[10px] text-slate-500 mb-2 font-mono uppercase">实时审计全链路轨迹:</div>
             <div className="bg-black/40 border border-white/5 p-3 rounded-lg font-mono text-[9px] text-cyan-400/80 leading-relaxed max-h-32 overflow-y-auto">
                {`[1] 发现异常退款信号 -> [ORD-8829]\n[2] 触发规则引擎与模型融合评分: 92/100\n[3] 路由决策 -> 执行“深度深度溯源”路径\n[4] 主动调取业务日志 & 关联图谱搜索...\n[5] 发现关系网: 共用虚拟卡 VCC-721\n[6] 正在构建结构化证据实体包...`}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Page: Investigation ---
function Investigation() {
  const [step, setStep] = useState(0);
  const [showReport, setShowReport] = useState(false);

  const investigationSteps = [
    { title: '1. 信号评分与初筛', desc: '提取多维特征：多账号关联(92)、IP位置漂移(45)、文本NLP匹配(88)', detail: '风险评估: 94/100 - 高危' },
    { title: '2. 风险模式匹配', desc: '命中“跨境团伙化套利”模式，发现特征码 P-901-X 与历史库高度对齐', detail: '命中: Cluster_Refund_Arbitrage' },
    { title: '3. 调查复杂度路由', desc: '属性组合复杂度极高，AI 判定为“专家级任务”，执行深度取证路由', detail: '路由: High_Complexity_Path' },
    { title: '4. 主动追证 (追证与反证)', desc: '调取底层业务日志、外部画像与设备 ID；同时主动搜索历史合规消费记录以抵扣误报风险', detail: '分析中: 240+ 历史条目已反证' },
    { title: '5. 证据护照生成', desc: '签署加密证据链，生成结构化确证报告。所有证据项置信度均超过 98%', detail: '生成的哈希: 0x8a2c...' }
  ];

  useEffect(() => {
    if (showReport) return;
    const timer = setInterval(() => {
      setStep(s => (s < investigationSteps.length - 1 ? s + 1 : s));
    }, 2500);
    return () => clearInterval(timer);
  }, [investigationSteps.length, showReport]);

  const allDone = step === investigationSteps.length - 1;

  if (showReport) {
    return <AuditReport onBack={() => setShowReport(false)} />;
  }

  return (
    <div className="p-6 h-full flex flex-col gap-6 overflow-hidden">
      {/* Investigation Toolbar */}
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className={`bg-red-500/10 text-red-500 border border-red-500/30 px-3 py-1.5 rounded-lg text-xs font-bold font-mono ${!allDone ? 'animate-pulse' : ''}`}>
               {allDone ? 'INVESTIGATION_COMPLETE' : 'PROACTIVE_TRACING_ACTIVE'}
            </div>
            <div>
               <h2 className="text-xl font-bold tracking-tight text-white uppercase">主动追证动态轨迹: <span className="text-slate-500">CASE_A84721</span></h2>
            </div>
         </div>
         <div className="flex gap-2">
            <button onClick={() => { setStep(0); setShowReport(false); }} className="px-4 py-2 border border-white/10 text-slate-400 rounded-xl text-xs hover:bg-white/5 transition-all flex items-center gap-2">
               <RefreshCw className="w-3 h-3" /> 重放分析
            </button>
            {allDone && (
              <motion.button 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setShowReport(true)}
                className="px-4 py-2 bg-violet-600 text-white rounded-xl text-xs font-bold neon-glow shadow-violet-500/50 hover:bg-violet-500 transition-all uppercase flex items-center gap-2"
              >
                 生成完整审计报告 <ChevronRight className="w-4 h-4" />
              </motion.button>
            )}
         </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Step Flow Visualization */}
        <div className="flex-[3] bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] rounded-3xl p-8 overflow-y-auto scrollbar-hide relative shadow-2xl shadow-black/50">
          <div className="absolute left-10 top-12 bottom-12 w-[2px] bg-slate-800" />
          <div className="space-y-12">
            {investigationSteps.map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={step >= i ? { opacity: 1, x: 0 } : { opacity: 0.1 }}
                className={`relative pl-14 flex flex-col gap-2 transition-all duration-700 ${step === i ? 'scale-105' : ''}`}
              >
                {/* Marker */}
                <div className={`absolute left-[-2px] top-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                  step > i ? 'bg-cyan-500 border-cyan-400 text-black' : 
                  step === i ? 'bg-violet-600 border-white text-white neon-glow shadow-violet-500/50' : 
                  'bg-[var(--color-bg-deep)] border-slate-700 text-slate-700'
                }`}>
                  {step > i ? <ShieldCheck className="w-3 h-3" /> : <div className="text-[10px] font-bold">{i+1}</div>}
                </div>
                
                <h3 className={`text-sm font-bold uppercase tracking-widest ${step === i ? 'text-violet-400' : 'text-slate-500'}`}>{s.title}</h3>
                <p className={`text-sm leading-relaxed max-w-2xl ${step === i ? 'text-white' : 'text-slate-600'}`}>{s.desc}</p>
                <div className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-2">
                   <Activity className="w-3 h-3" /> 执行 Agent: {s.detail}
                </div>

                {/* Content Expanding for Steps */}
                {step === i && i === 3 && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 p-5 bg-black/40 border border-white/5 rounded-2xl overflow-hidden">
                     <div className="flex items-center gap-8">
                        <div className="relative w-24 h-24 flex items-center justify-center">
                           <Network className="w-full h-full text-red-500/30 animate-pulse" />
                           <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
                        </div>
                        <div className="space-y-2 flex-1">
                           <div className="text-[10px] text-cyan-400 font-mono tracking-tighter uppercase whitespace-pre">发现高危关联域 UID: 882190...<br/>拓扑深度: 3.2 层</div>
                           <div className="grid grid-cols-4 gap-2">
                              {[1,2,3,4].map(j => <div key={j} className="h-1 bg-violet-500 rounded-full animate-pulse" />)}
                           </div>
                        </div>
                     </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right - Evidence Passport (Optimized) */}
        <div className="flex-1 flex flex-col gap-4">
           <div className="flex-1 bg-gradient-to-b from-slate-900 via-black to-slate-900 border border-white/5 rounded-3xl p-6 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 p-1 opacity-10 rotate-12">
                 <ShieldCheck className="w-40 h-40" />
              </div>
              
              <div className="flex flex-col items-center mb-8 gap-4 relative">
                 <div className="w-20 h-20 rounded-2xl bg-black border border-white/5 flex items-center justify-center p-3 shadow-inner">
                    <motion.div animate={{ rotateY: 360 }} transition={{ repeat: Infinity, duration: 8, ease: "linear" }}>
                       <Zap className="w-full h-full text-violet-500 fill-violet-500/20" />
                    </motion.div>
                 </div>
                 <div className="text-center">
                    <div className="text-[10px] font-mono tracking-[0.4em] text-slate-500 uppercase mb-1">Evidence Passport</div>
                    <div className="text-xs text-white font-bold tracking-widest uppercase">证据实体证书</div>
                 </div>
              </div>

              <div className="space-y-4 flex-1">
                 <div className="p-3 border border-white/5 bg-white/[0.02] rounded-xl flex flex-col gap-1">
                    <span className="text-[9px] text-slate-500 uppercase">风险决策研判</span>
                    <span className="text-xs font-bold text-red-500 uppercase leading-none">团伙型恶意套利退款</span>
                 </div>
                 <div className="p-3 border border-white/5 bg-white/[0.02] rounded-xl flex flex-col gap-1">
                    <span className="text-[9px] text-slate-500 uppercase">置信度评分</span>
                    <div className="flex items-end gap-2">
                       <span className="text-2xl font-bold font-mono text-white leading-none">98.4<span className="text-sm">%</span></span>
                       <span className="text-[9px] text-green-400 uppercase font-mono mb-1">极速收敛</span>
                    </div>
                 </div>
                 <div className="p-3 border border-white/5 bg-white/[0.02] rounded-xl flex flex-col gap-2">
                    <span className="text-[9px] text-slate-500 uppercase">审计链关键要素</span>
                    <div className="space-y-2">
                       <div className="flex justify-between items-center text-[10px]">
                          <span className="text-slate-400">底层指纹匹配</span>
                          <span className="text-green-400 font-mono">100%</span>
                       </div>
                       <div className="flex justify-between items-center text-[10px]">
                          <span className="text-slate-400">社交/IP 聚类</span>
                          <span className="text-green-400 font-mono">82%</span>
                       </div>
                       <div className="flex justify-between items-center text-[10px]">
                          <span className="text-slate-400 text-yellow-500">不确定性标注</span>
                          <span className="text-yellow-500 font-mono">低</span>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex flex-col gap-2 opacity-50">
                <div className="flex justify-between text-[8px] font-mono text-slate-600">
                   <span>ID: EB-901-229-X</span>
                   <span>ST: 2026-05-08</span>
                </div>
                <div className="text-[8px] text-slate-700 font-mono text-center">
                   HASH: f8a1...92b1 | 已上链存证
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

// --- Component: Audit Report ---
function AuditReport({ onBack }: { onBack: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 h-full overflow-y-auto bg-[var(--color-bg-deep)] relative"
    >
      <div className="max-w-5xl mx-auto space-y-8 pb-32">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
           <div className="flex items-center gap-6">
              <button 
                onClick={onBack}
                className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/5 transition-all"
              >
                <ChevronRight className="w-5 h-5 rotate-180 text-slate-400" />
              </button>
              <div>
                 <div className="text-[10px] text-violet-400 font-mono uppercase tracking-[0.4em] mb-1">Comprehensive Audit Report</div>
                 <h2 className="text-2xl font-bold text-white uppercase tracking-tight">连续审计确证报告 // CASE_A84721</h2>
              </div>
           </div>
           <div className="text-right">
              <div className="text-[9px] text-slate-500 uppercase mb-1">报告生成时间</div>
              <div className="text-xs font-mono text-slate-300">2026-05-08 17:04:12</div>
           </div>
        </div>

        {/* Top Summary Grid */}
        <div className="grid grid-cols-3 gap-6">
           <div className="col-span-1 bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
              <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest border-b border-white/5 pb-2">1. 风险模式 (Pattern)</div>
              <div className="space-y-4">
                 <div className="text-lg font-bold text-red-400 uppercase">跨境团伙化套利</div>
                 <p className="text-xs text-slate-400 leading-relaxed uppercase tracking-tight">
                    该案例命中了系统新演化出的“跨账号票务空单套利”高危模式。特征表现为：高延迟同步退款、VCC 代理网关、底层硬件指纹高度重叠。
                 </p>
                 <div className="flex gap-2">
                    <span className="px-2 py-0.5 bg-red-900/20 text-red-500 border border-red-500/30 rounded text-[9px] font-mono">团伙化</span>
                    <span className="px-2 py-0.5 bg-red-900/20 text-red-500 border border-red-500/30 rounded text-[9px] font-mono">虚拟化</span>
                 </div>
              </div>
           </div>

           <div className="col-span-1 bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
              <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest border-b border-white/5 pb-2">2. 置信度评分 (Confidence)</div>
              <div className="flex-1 flex flex-col justify-center items-center gap-2">
                 <div className="text-5xl font-bold font-mono text-green-400">98.4<span className="text-xl">%</span></div>
                 <div className="text-[10px] text-slate-500 uppercase tracking-tighter">判定依据：所有核心证据指向一致性</div>
                 <div className="w-full bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '98.4%' }} className="h-full bg-green-500" />
                 </div>
              </div>
           </div>

           <div className="col-span-1 bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
              <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest border-b border-white/5 pb-2">3. 命中规则 (Hit Rules)</div>
              <div className="space-y-3">
                 {[
                   'RULE_VCC_GATEWAY_DETECTED',
                   'RULE_TX_CONCURRENCY_SYNC_HIGH',
                   'RULE_IDENTITY_CLUSTER_EXPANSION'
                 ].map(rule => (
                   <div key={rule} className="flex items-center gap-2 text-[10px] font-mono text-slate-300 bg-black/40 p-2 rounded border border-white/5">
                      <Zap className="w-3 h-3 text-yellow-500" /> {rule}
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Investigation & Evidence Detail */}
        <div className="grid grid-cols-5 gap-8">
           {/* Flow & Counter-evidence */}
           <div className="col-span-3 space-y-8">
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 space-y-4">
                 <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest border-b border-white/5 pb-2">4. 追证流程与全方位取证 (Evidence Tracing)</div>
                 <div className="space-y-6 pt-4">
                    {[
                      { step: '信号初筛', source: '业务实时接入流', result: '风险评分 94，触发深度路由' },
                      { step: '关系探测', source: '全量图核心 (Nebula)', result: '锁定以 UID: 8821 开头的 12 个关联节点' },
                      { step: '日志穿透', source: '日志服务 (SLS/Kibana)', result: '发现底层 MAC 指纹完全对齐，伪装指纹层被穿透' },
                      { step: '第三方画像', source: '外部数源合作方', result: '该设备 ID 曾出现在 3 个历史黑灰产黑名单中' },
                    ].map((e, idx) => (
                      <div key={idx} className="flex gap-4">
                         <div className="w-1 h-10 bg-violet-500/20 rounded-full flex items-center justify-center font-mono text-[10px] text-violet-400">
                            {idx + 1}
                         </div>
                         <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                               <span className="text-xs font-bold text-white uppercase">{e.step}</span>
                               <span className="text-[9px] text-slate-500 uppercase">{e.source}</span>
                            </div>
                            <p className="text-[10px] text-slate-400 font-mono">{e.result}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Counter-Evidence */}
              <div className="bg-violet-600/5 border border-violet-500/10 rounded-2xl p-6 space-y-4">
                 <div className="text-[10px] text-violet-400 font-mono uppercase tracking-widest border-b border-violet-500/10 pb-2 flex justify-between">
                    <span>5. 反证结果 (Counter-Evidence)</span>
                    <span className="text-green-400">已搜索 20w+ 历史轨迹</span>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                       <div className="text-[9px] text-slate-500 uppercase mb-1">历史信任分</div>
                       <div className="text-xs font-bold text-red-500 uppercase">无显著白名单活跃</div>
                    </div>
                    <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                       <div className="text-[9px] text-slate-500 uppercase mb-1">申诉频率</div>
                       <div className="text-xs font-bold text-white uppercase font-mono">0 次 / 3 年内</div>
                    </div>
                    <div className="col-span-2 p-3 bg-black/40 rounded-xl border border-white/5">
                       <div className="text-[9px] text-slate-500 uppercase mb-2">反证结论</div>
                       <p className="text-[10px] text-slate-400 leading-relaxed italic">
                          AI 未发现该案例对应的任何正面行为指标（如：长期稳定收货地址、实名认证强一致性）。反证库匹配为空，欺诈判定不降权。
                       </p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Evidence Snapshot (Right Column) */}
           <div className="col-span-2 space-y-6">
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 h-full flex flex-col gap-6">
                 <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest border-b border-white/5 pb-2">6. 所有核心证据集 (Evidence Pool)</div>
                 <div className="space-y-4 flex-1">
                    <div className="group space-y-2 p-4 bg-white/[0.03] border border-white/5 rounded-xl hover:border-cyan-500/30 transition-all">
                       <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-white uppercase">HARDWARE_FINGERPRINT</span>
                          <ShieldCheck className="w-3 h-3 text-green-400" />
                       </div>
                       <div className="text-[9px] font-mono text-slate-500 break-all leading-relaxed uppercase">
                          MATCH_HASH: E2-A1-44-BB-90-CC<br/>
                          SIMILARITY: 1.0 (EXACT)
                       </div>
                    </div>
                    <div className="group space-y-2 p-4 bg-white/[0.03] border border-white/5 rounded-xl hover:border-cyan-500/30 transition-all">
                       <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-white uppercase">IP_GEOLOCATION</span>
                          <ShieldCheck className="w-3 h-3 text-yellow-400" />
                       </div>
                       <div className="text-[9px] font-mono text-slate-500 break-all leading-relaxed uppercase">
                          GATEWAY: proxy_sg_721<br/>
                          ASN: AS13335 (Cloudflare)
                       </div>
                    </div>
                    <div className="group space-y-2 p-4 bg-white/[0.03] border border-white/5 rounded-xl hover:border-cyan-500/30 transition-all">
                       <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-white uppercase">BEHAVIOR_CHRONO</span>
                          <ShieldCheck className="w-3 h-3 text-green-400" />
                       </div>
                       <div className="text-[9px] font-mono text-slate-500 break-all leading-relaxed uppercase">
                          DELTA_TS: 242ms / 281ms / 255ms<br/>
                          PATTERN: HIGH_CONCURRENCY
                       </div>
                    </div>
                 </div>
                 
                 {/* QR Code Placeholder for Chain-of-Custody */}
                 <div className="mt-4 pt-6 text-center space-y-3 opacity-30">
                    <div className="w-32 h-32 mx-auto border-2 border-white/10 rounded p-1 flex items-center justify-center">
                       <div className="grid grid-cols-8 grid-rows-8 gap-0.5 w-full h-full">
                          {Array.from({ length: 64 }).map((_, i) => (
                            <div key={i} className={`rounded-sm ${Math.random() > 0.5 ? 'bg-white' : 'transparent'}`} />
                          ))}
                       </div>
                    </div>
                    <div className="text-[8px] font-mono text-slate-600 uppercase">
                       经 AuditAI-Nodes 节点共识确认<br/>区块链存证 HASH 已广播
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Human Confirmation Section - Sticky Bottom */}
        <motion.div 
           initial={{ y: 50, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           className="fixed bottom-0 left-16 right-0 bg-black/80 backdrop-blur-3xl border-t border-violet-500/20 px-12 py-6 flex items-center justify-between z-50 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
        >
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                 <div className="w-12 h-12 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-yellow-500 animate-pulse" />
                 </div>
                 <div>
                    <div className="text-xs font-bold text-white uppercase tracking-widest mb-1">人机协同决策节点 (Manual Approval)</div>
                    <div className="text-[10px] text-slate-500 font-mono">请审计员根据报告，对该笔高危风险操作进行终态判定。</div>
                 </div>
              </div>
           </div>

           <div className="flex gap-4">
              <button className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-red-900/20 uppercase">
                 确定性欺诈：终止交易并封号
              </button>
              <button className="px-8 py-3 bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 font-bold rounded-xl text-sm transition-all uppercase">
                 需进一步人工调查
              </button>
              <button className="px-8 py-3 bg-green-900/20 hover:bg-green-900/40 text-green-400 border border-green-500/20 font-bold rounded-xl text-sm transition-all uppercase">
                 误报解除：释放交易
              </button>
           </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// --- Page: Learning Center ---
function LearningCenter() {
  const [patterns, setPatterns] = useState([
    { 
      id: 'P-901-X',
      title: '多账号协同退款并发', 
      desc: '攻击者利用多个高等级陈年账号在极短时间内利用共享虚拟卡代理发起同步退款，规避单账号限额。',
      rule: 'IF (Session.VCC_Entropy > 0.85 && Tx.Sync_Factor > 0.9 && Account.Age > 1y) THEN AuditLevel = "Critical"',
      confidence: '92.4%', 
      signal: '集群性', 
      instances: 42,
      mitigated: '$34,200',
      status: 'pending',
      accuracy: 85
    },
    { 
      id: 'P-902-B',
      title: '高频换绑身份套利', 
      desc: '通过频繁更换账号绑定的手机号/邮箱，试图重置新手奖励权重或规避身份黑名单关联。',
      rule: 'IF (ID.Change_Freq > 3/week && Account.NewReward_Claimed == True) THEN BlockAction = "Verify_Identity"',
      confidence: '88.1%', 
      signal: '多变性', 
      instances: 12,
      mitigated: '$12,800',
      status: 'pending',
      accuracy: 76
    },
    { 
      id: 'P-903-Y',
      title: '延迟退款组合策略', 
      desc: '在订单完成后接近结算临界点时，利用不同支付渠道的到账时延差进行非法套利。',
      rule: 'IF (Tx.Settle_Gap < 1h && Tx.Method_Entropy > 0.7) THEN Flag = "Temporal_Risk"',
      confidence: '79.2%', 
      signal: '时序型', 
      instances: 8,
      mitigated: '$5,500',
      status: 'pending',
      accuracy: 64
    },
  ]);

  const [selectedId, setSelectedId] = useState('P-901-X');
  const selectedPattern = patterns.find(p => p.id === selectedId) || patterns[0];

  const handleStatusChange = (id: string, newStatus: string) => {
    setPatterns(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  return (
    <div className="p-6 h-full flex flex-col gap-6 overflow-hidden">
      <div className="flex items-center justify-between">
         <div>
            <h2 className="text-xl font-bold tracking-tight text-white uppercase">研判模式进化枢纽 // <span className="text-violet-400">持续自学习系统</span></h2>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-tight">AI 自动从处置数据中挖掘新型风险模式，并经过离线训练闭环进化。</p>
         </div>
         <div className="flex gap-3">
            <div className="flex flex-col items-end">
               <div className="text-[10px] text-slate-500 uppercase">最近次模型迭代</div>
               <div className="text-xs font-mono text-cyan-400">v4.8.2 // 2h 前</div>
            </div>
            <div className="h-10 w-10 border border-white/10 rounded-xl flex items-center justify-center bg-white/5">
               <RefreshCw className="w-5 h-5 text-violet-400" />
            </div>
         </div>
      </div>

      <div className="flex-1 grid grid-cols-3 gap-6 overflow-hidden">
        {/* New Pattern Mining List */}
        <div className="col-span-1 bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] rounded-3xl flex flex-col overflow-hidden">
           <div className="p-4 border-b border-white/5 bg-black/20 flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">最新挖掘出的模式</span>
              <span className="text-[9px] bg-violet-600/20 text-violet-400 px-2 rounded border border-violet-600/30">
                {patterns.filter(p => p.status === 'pending').length} 个待审核
              </span>
           </div>
           <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {patterns.map((p) => (
                <div 
                  key={p.id} 
                  onClick={() => setSelectedId(p.id)}
                  className={`p-4 border transition-all cursor-pointer group rounded-2xl relative ${
                    selectedId === p.id 
                      ? 'bg-violet-600/10 border-violet-500/50' 
                      : 'bg-white/5 border-white/5 hover:border-white/10'
                  }`}
                >
                   {p.status !== 'pending' && (
                     <div className={`absolute top-2 right-2 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${
                       p.status === 'approved' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                     }`}>
                       {p.status === 'approved' ? '已入库' : '已放弃'}
                     </div>
                   )}
                   <div className="flex justify-between items-start mb-2">
                       <div className={`text-xs font-bold uppercase transition-colors ${selectedId === p.id ? 'text-violet-400' : 'text-white'}`}>
                         {p.title}
                       </div>
                       <div className="text-[10px] font-mono text-cyan-400">{p.confidence}</div>
                   </div>
                   <div className="flex items-center gap-3">
                      <span className="text-[9px] text-slate-500 uppercase font-mono">特征: {p.signal}</span>
                      <span className="text-[9px] text-slate-500 uppercase font-mono">命中: {p.instances}次</span>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Training & Analysis View */}
        <div className="col-span-2 bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] rounded-3xl p-8 flex flex-col gap-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-5">
              <RefreshCw className="w-64 h-64 text-cyan-400 spin-slow" />
           </div>

           <AnimatePresence mode="wait">
             <motion.div 
               key={selectedPattern.id}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               transition={{ duration: 0.2 }}
               className="flex-1 flex flex-col gap-8"
             >
                <div className="flex justify-between items-start relative">
                    <div className="space-y-2">
                      <div className="text-[10px] text-violet-400 font-mono uppercase tracking-[0.3em]">Neural Mode Investigation</div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold text-white uppercase">模式深度穿透分析 // {selectedPattern.id}</h3>
                        <span className="text-xs font-bold text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded border border-cyan-400/20">{selectedPattern.title}</span>
                      </div>
                      <p className="text-sm text-slate-400 max-w-xl mt-4 leading-relaxed">
                          {selectedPattern.desc}
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                          <div className="text-[10px] text-slate-600 uppercase mb-1">预估拦截潜力</div>
                          <div className="text-2xl font-bold text-green-400 font-mono">{selectedPattern.mitigated}</div>
                      </div>
                    </div>
                </div>

                <div className="flex-1 grid grid-cols-2 gap-8 relative">
                    <div className="flex flex-col gap-6">
                      <div className="space-y-4">
                          <div className="text-[10px] text-slate-500 uppercase font-mono flex items-center gap-2">
                            <Zap className="w-3 h-3 text-yellow-500" /> 特征相关性热力图 (Rule Correlation)
                          </div>
                          <div className="grid grid-cols-8 gap-1 h-32">
                            {Array.from({ length: 64 }).map((_, k) => (
                              <motion.div 
                                  key={k} 
                                  animate={{ opacity: [0.1, 0.4, 0.1] }}
                                  transition={{ repeat: Infinity, duration: Math.random() * 3 + 1, delay: Math.random() }}
                                  className={`rounded-sm ${Math.random() > 0.7 ? 'bg-cyan-500' : 'bg-slate-800'}`} 
                              />
                            ))}
                          </div>
                      </div>
                      <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                          <div className="text-[10px] font-mono text-cyan-400 mb-3 uppercase">AI 量化审计规则 (Rule Definition):</div>
                          <div className="text-[11px] text-slate-300 font-mono leading-relaxed bg-black/40 p-3 rounded-lg border border-white/5">
                            {selectedPattern.rule}
                          </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-6">
                      <div className="flex-1 bg-black/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-center items-center gap-4">
                          <div className="relative w-32 h-32">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="8" />
                                <motion.circle 
                                  cx="50" cy="50" r="45" fill="none" stroke="#8b5cf6" strokeWidth="8" 
                                  strokeDasharray="282.7" 
                                  initial={{ strokeDashoffset: 282.7 }}
                                  animate={{ strokeDashoffset: 282.7 - (282.7 * selectedPattern.accuracy / 100) }}
                                  transition={{ duration: 1 }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
                                <span className="text-xl font-bold text-white tracking-tighter uppercase">{selectedPattern.accuracy}%</span>
                                <span className="text-[8px] text-slate-500 uppercase">精准度回测</span>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs font-bold text-white uppercase mb-1">模式可解释性评估</div>
                            <p className="text-[9px] text-slate-500 max-w-[180px] leading-relaxed">
                                基于 {selectedPattern.instances * 20} 条关联样本回测，该识别模式已处于“建议入库”状态。
                            </p>
                          </div>
                      </div>
                      
                      {selectedPattern.status === 'pending' ? (
                        <div className="flex gap-4">
                           <button 
                             onClick={() => handleStatusChange(selectedPattern.id, 'approved')}
                             className="flex-1 py-4 bg-violet-600 hover:bg-violet-500 text-white rounded-2xl text-sm font-bold uppercase transition-all neon-glow shadow-violet-500/50"
                           >
                              纳入风险模式库
                           </button>
                           <button 
                             onClick={() => handleStatusChange(selectedPattern.id, 'discarded')}
                             className="px-6 py-4 bg-white/5 hover:bg-red-900/20 text-slate-400 hover:text-red-400 border border-white/10 hover:border-red-500/30 rounded-2xl text-sm font-bold"
                           >
                              放弃
                           </button>
                        </div>
                      ) : (
                        <div className={`py-4 rounded-2xl border text-center font-bold uppercase transition-all ${
                          selectedPattern.status === 'approved' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
                        }`}>
                          {selectedPattern.status === 'approved' ? '模式已成功合入全局库' : '该模式已被忽略'}
                        </div>
                      )}
                    </div>
                </div>
             </motion.div>
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
