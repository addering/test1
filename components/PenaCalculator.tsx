"use client";

import { useState } from "react";
import { add, sub } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function PenaCalculator() {
    const [startDate, setStartDate] = useState("");
    const [years, setYears] = useState("0");
    const [months, setMonths] = useState("0");
    const [days, setDays] = useState("0");
    const [lostSemesters, setLostSemesters] = useState("0");
    const [releaseDate, setReleaseDate] = useState(null);
    const [finalDate, setFinalDate] = useState(null);

    const calculateReleaseDate = () => {
        if (!startDate) return;

        let start = new Date(startDate);
        if (isNaN(start.getTime())) return;

        const parsedYears = parseInt(years, 10) || 0;
        const parsedMonths = parseInt(months, 10) || 0;
        const parsedDays = parseInt(days, 10) || 0;
        const parsedLostSemesters = parseInt(lostSemesters, 10) || 0;

        let provRelease = add(start, { years: parsedYears, months: parsedMonths, days: parsedDays });
        setReleaseDate(provRelease);

        let totalSemesters = Math.floor((parsedYears * 12 + parsedMonths) / 6);
        let usableSemesters = totalSemesters > 0 ? totalSemesters - 1 : 0;
        let reductionDays = usableSemesters * 45;
        let finalRelease = sub(provRelease, { days: reductionDays });

        let lostDays = parsedLostSemesters * 45;
        finalRelease = add(finalRelease, { days: lostDays });

        setFinalDate(finalRelease);
    };

    return (
        <Card className="p-8 max-w-md mx-auto mt-10 bg-gray-100 shadow-lg rounded-2xl">
            <CardContent>
                <h2 className="text-xl font-bold mb-4 text-center">Calcolatore Fine Pena - Realizzato da Luca</h2>
                <p className="text-center mb-2">
                    <Link href="https://www.tiktok.com/@epic.luc4" className="text-blue-500 underline">Seguimi su TikTok</Link>
                </p>
                <label>Data inizio pena:</label>
                <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <label>Anni da scontare:</label>
                <Input 
                    type="number" 
                    value={years} 
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                            setYears(value);
                        }
                    }} 
                />
                <label>Mesi da scontare:</label>
                <Input 
                    type="number" 
                    value={months} 
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                            setMonths(value);
                        }
                    }} 
                />
                <label>Giorni da scontare:</label>
                <Input 
                    type="number" 
                    value={days} 
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                            setDays(value);
                        }
                    }} 
                />
                <label>Eventuali semestri persi:</label>
                <Input 
                    type="number" 
                    value={lostSemesters} 
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                            setLostSemesters(value);
                        }
                    }} 
                />
                <Button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700" onClick={calculateReleaseDate}>Calcola</Button>
                {releaseDate && (
                    <div className="mt-4 p-3 bg-white rounded-lg shadow">
                        <p className="font-semibold">Data di liberazione provvisoria: {releaseDate?.toLocaleDateString()}</p>
                        <p className="font-semibold">Data di liberazione finale: {finalDate?.toLocaleDateString() || "Non calcolata"}</p>
                    </div>
                )}
                <Button 
                    className="mt-2 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                    onClick={() => {
                        setStartDate("");
                        setYears("0");
                        setMonths("0");
                        setDays("0");
                        setLostSemesters("0");
                        setReleaseDate(null);
                        setFinalDate(null);
                    }}
                >
                    Reset
                </Button>
                <p className="text-center text-gray-500 mt-6">Realizzato da Luca e Alex di Familia Muy Grande</p>
            </CardContent>
        </Card>
    );
}