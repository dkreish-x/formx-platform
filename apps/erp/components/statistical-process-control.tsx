"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  CheckCircle,
  BarChart2,
  Activity,
  List,
  Download,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock SPC data for a control chart
const generateSpcData = (mean: number, lcl: number, ucl: number, outOfControlPoints: number[] = []) => {
  const data = []

  for (let i = 1; i <= 30; i++) {
    // Generate random variation around the mean
    let value = mean + (Math.random() * 2 - 1) * (ucl - mean) * 0.4

    // Force some points to be out of control
    if (outOfControlPoints.includes(i)) {
      value = Math.random() > 0.5 ? ucl + Math.random() * 0.5 : lcl - Math.random() * 0.5
    }

    data.push({
      sampleId: i,
      value: Number.parseFloat(value.toFixed(3)),
      mean,
      ucl,
      lcl,
      outOfControl: value > ucl || value < lcl,
    })
  }

  return data
}

// Mock characteristic data
const characteristics = [
  {
    id: "CHAR-001",
    name: "Hole Diameter A",
    nominal: 12.5,
    tolerance: "±0.05",
    lcl: 12.45,
    ucl: 12.55,
    mean: 12.5,
    cpk: 1.45,
    status: "In Control",
    outOfControlPoints: [8, 22],
  },
  {
    id: "CHAR-002",
    name: "Hole Position X",
    nominal: 25.0,
    tolerance: "±0.1",
    lcl: 24.9,
    ucl: 25.1,
    mean: 25.0,
    cpk: 1.32,
    status: "In Control",
    outOfControlPoints: [15],
  },
  {
    id: "CHAR-003",
    name: "Surface Finish",
    nominal: 32,
    tolerance: "Ra max",
    lcl: 0,
    ucl: 32,
    mean: 18,
    cpk: 0.98,
    status: "Monitor",
    outOfControlPoints: [7, 18, 24],
  },
  {
    id: "CHAR-004",
    name: "Depth",
    nominal: 40.0,
    tolerance: "±0.2",
    lcl: 39.8,
    ucl: 40.2,
    mean: 40.0,
    cpk: 0.75,
    status: "Out of Control",
    outOfControlPoints: [3, 12, 19, 28],
  },
  {
    id: "CHAR-005",
    name: "Flatness",
    nominal: 0.05,
    tolerance: "max",
    lcl: 0,
    ucl: 0.05,
    mean: 0.03,
    cpk: 1.12,
    status: "In Control",
    outOfControlPoints: [],
  },
]

// Generate SPC data for each characteristic
const characteristicData = characteristics.map((char) => ({
  ...char,
  data: generateSpcData(char.mean, char.lcl, char.ucl, char.outOfControlPoints),
}))

export function StatisticalProcessControl() {
  const [selectedCharacteristic, setSelectedCharacteristic] = useState(characteristicData[0].id)
  const [activeTab, setActiveTab] = useState("controlChart")

  const currentCharData = characteristicData.find((char) => char.id === selectedCharacteristic)

  const formattedData = currentCharData?.data || []

  // Calculate process capability metrics
  const mean = formattedData.reduce((sum, item) => sum + item.value, 0) / formattedData.length
  const standardDeviation = Math.sqrt(
    formattedData.reduce((sum, item) => sum + Math.pow(item.value - mean, 2), 0) / formattedData.length,
  )

  // Count out of control points
  const outOfControlCount = formattedData.filter((item) => item.outOfControl).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Statistical Process Control</h2>
          <p className="text-muted-foreground">Monitor critical quality characteristics and process capability</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select value={selectedCharacteristic} onValueChange={setSelectedCharacteristic}>
            <SelectTrigger className="w-[210px]">
              <SelectValue placeholder="Select characteristic" />
            </SelectTrigger>
            <SelectContent>
              {characteristicData.map((char) => (
                <SelectItem key={char.id} value={char.id}>
                  {char.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {currentCharData && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Sample Size</p>
                  <h3 className="text-2xl font-bold">{formattedData.length}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Process Cpk</p>
                  <h3 className="text-2xl font-bold">{currentCharData.cpk.toFixed(2)}</h3>
                </div>
                <div
                  className={`h-12 w-12 rounded-full flex items-center justify-center ${
                    currentCharData.cpk >= 1.33
                      ? "bg-green-100"
                      : currentCharData.cpk >= 1.0
                        ? "bg-amber-100"
                        : "bg-red-100"
                  }`}
                >
                  <BarChart2
                    className={`h-6 w-6 ${
                      currentCharData.cpk >= 1.33
                        ? "text-green-600"
                        : currentCharData.cpk >= 1.0
                          ? "text-amber-600"
                          : "text-red-600"
                    }`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <h3 className="text-2xl font-bold flex items-center">
                    <Badge
                      className="mr-2"
                      variant={
                        currentCharData.status === "In Control"
                          ? "default"
                          : currentCharData.status === "Monitor"
                            ? "warning"
                            : "destructive"
                      }
                    >
                      {currentCharData.status}
                    </Badge>
                  </h3>
                </div>
                <div
                  className={`h-12 w-12 rounded-full flex items-center justify-center ${
                    currentCharData.status === "In Control"
                      ? "bg-green-100"
                      : currentCharData.status === "Monitor"
                        ? "bg-amber-100"
                        : "bg-red-100"
                  }`}
                >
                  {currentCharData.status === "In Control" ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : currentCharData.status === "Monitor" ? (
                    <Activity className="h-6 w-6 text-amber-600" />
                  ) : (
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Out of Control</p>
                  <h3 className="text-2xl font-bold">{outOfControlCount}</h3>
                </div>
                <div
                  className={`h-12 w-12 rounded-full flex items-center justify-center ${
                    outOfControlCount === 0 ? "bg-green-100" : outOfControlCount <= 2 ? "bg-amber-100" : "bg-red-100"
                  }`}
                >
                  {outOfControlCount === 0 ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : outOfControlCount <= 2 ? (
                    <Activity className="h-6 w-6 text-amber-600" />
                  ) : (
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{currentCharData?.name}</CardTitle>
              <CardDescription>
                Nominal: {currentCharData?.nominal} | Tolerance: {currentCharData?.tolerance}
              </CardDescription>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
              <TabsList>
                <TabsTrigger value="controlChart">Control Chart</TabsTrigger>
                <TabsTrigger value="dataTable">Data Table</TabsTrigger>
                <TabsTrigger value="histogram">Histogram</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <TabsContent value="controlChart" className="mt-0">
            <div className="h-[400px]">
              <ChartContainer
                config={{
                  value: {
                    label: "Measurement Value",
                    color: "hsl(var(--chart-1))",
                  },
                  ucl: {
                    label: "Upper Control Limit",
                    color: "hsl(var(--chart-2))",
                  },
                  lcl: {
                    label: "Lower Control Limit",
                    color: "hsl(var(--chart-3))",
                  },
                  mean: {
                    label: "Mean",
                    color: "hsl(var(--chart-4))",
                  },
                }}
                className="h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={formattedData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 20,
                      bottom: 40,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="sampleId" label={{ value: "Sample", position: "insideBottom", offset: -20 }} />
                    <YAxis
                      domain={[
                        formattedData.length > 0
                          ? Math.min(currentCharData?.lcl || 0, Math.min(...formattedData.map((item) => item.value))) -
                            0.1
                          : 0,
                        formattedData.length > 0
                          ? Math.max(currentCharData?.ucl || 1, Math.max(...formattedData.map((item) => item.value))) +
                            0.1
                          : 1,
                      ]}
                      label={{ value: "Measurement", angle: -90, position: "insideLeft" }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />

                    <ReferenceLine
                      y={currentCharData?.ucl}
                      stroke="var(--color-ucl)"
                      strokeDasharray="3 3"
                      label={{ value: "UCL", position: "right" }}
                    />
                    <ReferenceLine
                      y={currentCharData?.mean}
                      stroke="var(--color-mean)"
                      label={{ value: "Mean", position: "right" }}
                    />
                    <ReferenceLine
                      y={currentCharData?.lcl}
                      stroke="var(--color-lcl)"
                      strokeDasharray="3 3"
                      label={{ value: "LCL", position: "right" }}
                    />

                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="var(--color-value)"
                      activeDot={{ r: 8 }}
                      dot={(props: any) => {
                        const { cx, cy, payload } = props
                        return payload.outOfControl ? (
                          <svg x={cx - 6} y={cy - 6} width={12} height={12} fill="red">
                            <circle cx="6" cy="6" r="6" />
                          </svg>
                        ) : (
                          <svg x={cx - 4} y={cy - 4} width={8} height={8} fill="var(--color-value)">
                            <circle cx="4" cy="4" r="4" />
                          </svg>
                        )
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-2">Process Parameters</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mean:</span>
                    <span className="font-medium">{mean.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Standard Deviation:</span>
                    <span className="font-medium">{standardDeviation.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">UCL:</span>
                    <span className="font-medium">{currentCharData?.ucl}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">LCL:</span>
                    <span className="font-medium">{currentCharData?.lcl}</span>
                  </div>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-2">Process Capability</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cp:</span>
                    <span className="font-medium">
                      {((currentCharData?.ucl || 0) - (currentCharData?.lcl || 0) / (6 * standardDeviation)).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cpk:</span>
                    <span className="font-medium">{currentCharData?.cpk.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pp:</span>
                    <span className="font-medium">
                      {(
                        (((currentCharData?.ucl || 0) - (currentCharData?.lcl || 0)) / (6 * standardDeviation)) *
                        0.95
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ppk:</span>
                    <span className="font-medium">{(currentCharData?.cpk * 0.95).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-2">Analysis</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    {currentCharData?.status === "In Control" ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Process is in statistical control</span>
                      </>
                    ) : currentCharData?.status === "Monitor" ? (
                      <>
                        <Activity className="h-4 w-4 text-amber-500 mt-0.5" />
                        <span>Process shows signs of variation, monitoring advised</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                        <span>Process is out of control, corrective action required</span>
                      </>
                    )}
                  </div>

                  {outOfControlCount > 0 && (
                    <div className="text-amber-600 flex items-start gap-2">
                      <Info className="h-4 w-4 mt-0.5" />
                      <span>{outOfControlCount} out-of-control points detected</span>
                    </div>
                  )}

                  {currentCharData?.cpk < 1.33 && (
                    <div className="text-amber-600 flex items-start gap-2">
                      <Info className="h-4 w-4 mt-0.5" />
                      <span>Process capability (Cpk) below target of 1.33</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="dataTable" className="mt-0">
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sample ID</TableHead>
                    <TableHead>Measurement</TableHead>
                    <TableHead>Nominal</TableHead>
                    <TableHead>Deviation</TableHead>
                    <TableHead>% of Tolerance</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formattedData.map((item) => {
                    const deviation = item.value - (currentCharData?.nominal || 0)
                    const percentOfTolerance =
                      (Math.abs(deviation) / ((currentCharData?.ucl || 0) - (currentCharData?.lcl || 0))) * 100 * 2

                    return (
                      <TableRow key={item.sampleId}>
                        <TableCell>{item.sampleId}</TableCell>
                        <TableCell className={item.outOfControl ? "text-red-500 font-medium" : ""}>
                          {item.value}
                        </TableCell>
                        <TableCell>{currentCharData?.nominal}</TableCell>
                        <TableCell
                          className={deviation === 0 ? "" : deviation > 0 ? "text-amber-600" : "text-blue-600"}
                        >
                          {deviation > 0 ? "+" : ""}
                          {deviation.toFixed(3)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  percentOfTolerance > 80
                                    ? "bg-red-500"
                                    : percentOfTolerance > 50
                                      ? "bg-amber-500"
                                      : "bg-green-500"
                                }`}
                                style={{ width: `${Math.min(percentOfTolerance, 100)}%` }}
                              ></div>
                            </div>
                            <span>{percentOfTolerance.toFixed(1)}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {item.outOfControl ? (
                            <Badge variant="destructive">Out of Control</Badge>
                          ) : (
                            <Badge variant="default">In Control</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="histogram" className="mt-0">
            <div className="h-[400px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <BarChart2 className="h-12 w-12 mx-auto mb-2" />
                <p>Histogram view will be shown here</p>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>All Characteristics</CardTitle>
            <CardDescription>Status of all monitored quality characteristics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {characteristicData.map((char) => (
                <div
                  key={char.id}
                  className={`p-3 border rounded-md cursor-pointer transition-all ${
                    selectedCharacteristic === char.id ? "border-primary bg-primary/5" : ""
                  }`}
                  onClick={() => setSelectedCharacteristic(char.id)}
                >
                  <div className="flex justify-between">
                    <div className="font-medium">{char.name}</div>
                    <Badge
                      variant={
                        char.status === "In Control" ? "default" : char.status === "Monitor" ? "warning" : "destructive"
                      }
                    >
                      {char.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-muted-foreground">
                      Nominal: {char.nominal} ({char.tolerance})
                    </span>
                    <span>Cpk: {char.cpk.toFixed(2)}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          char.status === "In Control"
                            ? "bg-green-500"
                            : char.status === "Monitor"
                              ? "bg-amber-500"
                              : "bg-red-500"
                        }`}
                        style={{ width: `${(char.cpk / 2) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {char.data.filter((d) => d.outOfControl).length} issues
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rules Violations</CardTitle>
            <CardDescription>Western Electric Rules and Nelson Rules violations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border rounded-md bg-red-50">
                <div className="flex justify-between">
                  <div className="font-medium flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                    Point Outside Control Limits
                  </div>
                  <Button variant="ghost" className="h-6 px-2">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm mt-1 text-muted-foreground">Samples 8, 22 are outside the control limits</p>
              </div>

              <div className="p-3 border rounded-md bg-amber-50">
                <div className="flex justify-between">
                  <div className="font-medium flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                    Run of 7 Points Above/Below Mean
                  </div>
                  <Button variant="ghost" className="h-6 px-2">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm mt-1 text-muted-foreground">
                  7 consecutive points above mean starting at sample 12
                </p>
              </div>

              <div className="p-3 border rounded-md bg-amber-50">
                <div className="flex justify-between">
                  <div className="font-medium flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                    Trending Pattern Detected
                  </div>
                  <Button variant="ghost" className="h-6 px-2">
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="p-3 border rounded-md">
                <div className="flex justify-between">
                  <div className="font-medium flex items-center">
                    <Activity className="h-4 w-4 mr-2 text-muted-foreground" />2 of 3 Points in Zone A
                  </div>
                  <Button variant="ghost" className="h-6 px-2">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button variant="outline">
                  <List className="mr-2 h-4 w-4" />
                  View All Rule Violations
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
