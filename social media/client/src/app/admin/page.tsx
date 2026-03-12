'use client';

import { Shield, Users, Flag, AlertTriangle, CheckCircle, BarChart3, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

const MOCK_REPORTS = [
    { id: 1, user: 'troll_99', reason: 'Spam', target: 'Post #882', status: 'pending' },
    { id: 2, user: 'hater_man', reason: 'Harassment', target: 'Comment #12', status: 'pending' },
    { id: 3, user: 'bot_acc', reason: 'Inappropriate Content', target: 'Profile @bot_acc', status: 'investigating' },
];

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('reports');

    return (
        <div className="flex flex-col min-h-full bg-background pb-10">
            <div className="p-4 border-b border-border glass sticky top-0 z-10">
                <div className="flex items-center gap-2 text-primary mb-1">
                    <Shield size={20} />
                    <span className="text-xs font-bold uppercase tracking-widest">Admin Control Center</span>
                </div>
                <h1 className="text-2xl font-bold">Aura Management</h1>
            </div>

            <div className="p-4 space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard icon={Users} label="Total Users" value="1.2M" trend="+12%" />
                    <StatCard icon={BarChart3} label="Active Today" value="850K" trend="+5%" />
                    <StatCard icon={Flag} label="Reports" value="124" trend="-2%" color="text-red-500" />
                    <StatCard icon={CheckCircle} label="Verified" value="45.2K" trend="+1%" color="text-blue-500" />
                </div>

                {/* Navigation Tabs */}
                <div className="flex gap-2 p-1 bg-foreground/5 rounded-2xl border border-border">
                    <button
                        onClick={() => setActiveTab('reports')}
                        className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'reports' ? 'bg-background shadow-sm text-primary' : 'text-foreground/40 hover:text-foreground/60'}`}
                    >
                        Reports
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'users' ? 'bg-background shadow-sm text-primary' : 'text-foreground/40 hover:text-foreground/60'}`}
                    >
                        Users
                    </button>
                    <button
                        onClick={() => setActiveTab('content')}
                        className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'content' ? 'bg-background shadow-sm text-primary' : 'text-foreground/40 hover:text-foreground/60'}`}
                    >
                        Content
                    </button>
                </div>

                {/* Dashboard Content */}
                <div className="glass rounded-2xl border border-border overflow-hidden">
                    <div className="p-4 border-b border-border flex justify-between items-center">
                        <h2 className="font-bold flex items-center gap-2">
                            <AlertTriangle size={18} className="text-yellow-500" />
                            Pending Moderation
                        </h2>
                        <button className="text-xs font-bold text-primary hover:underline">View All</button>
                    </div>
                    <div className="divide-y divide-border">
                        {MOCK_REPORTS.map((report) => (
                            <div key={report.id} className="p-4 flex items-center justify-between hover:bg-foreground/5 transition-colors">
                                <div className="space-y-1">
                                    <p className="text-sm font-bold">@{report.user} <span className="text-foreground/40 font-normal">reported for</span> {report.reason}</p>
                                    <p className="text-xs text-foreground/40">Target: {report.target}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1 bg-red-500/10 text-red-500 text-xs font-bold rounded-lg border border-red-500/20 hover:bg-red-500 hover:text-white transition-all">Dismiss</button>
                                    <button className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-lg hover:opacity-90 transition-all">Review</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon: Icon, label, value, trend, color = 'text-foreground' }: any) {
    return (
        <div className="glass p-4 rounded-2xl border border-border">
            <div className="flex justify-between items-center mb-2">
                <div className={`p-2 rounded-xl bg-foreground/5 ${color}`}>
                    <Icon size={20} />
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 flex items-center gap-0.5`}>
                    {trend} <ArrowUpRight size={10} />
                </span>
            </div>
            <p className="text-2xl font-black">{value}</p>
            <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-wider">{label}</p>
        </div>
    );
}
