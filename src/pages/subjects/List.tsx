import {useMemo, useState} from "react";
import {useTable} from "@refinedev/react-table";
import type {ColumnDef} from "@tanstack/react-table";
import type {Subject} from "@/Types";

import {Search} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";

import {ListView} from "@/components/refine-ui/views/list-view";
import {Breadcrumb} from "@/components/refine-ui/layout/breadcrumb";
import {CreateButton} from "@/components/refine-ui/buttons/create";
import {DataTable} from "@/components/refine-ui/data-table/data-table";
import {Department_Options} from "@/constants";

const SubjectsList = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDepartment, setSelectedDepartment] =
        useState<string>("all");
    const filters = useMemo(
        () => [
            ...(selectedDepartment !== "all"
                ? [
                    {
                        field: "department",
                        operator: "eq" as const,
                        value: selectedDepartment,
                    },
                ]
                : []),
            ...(searchQuery.trim()
                ? [
                    {
                        field: "name",
                        operator: "contains" as const,
                        value: searchQuery.trim(),
                    },
                ]
                : []),
        ],
        [selectedDepartment, searchQuery]
    );

    const columns = useMemo<ColumnDef<Subject>[]>(
        () => [
            {
                id: "code",
                accessorKey: "code",
                size: 100,
                header: () => <p className="column-title ml-2">Code</p>,
                cell: ({getValue}) => (
                    <Badge>{getValue<string>()}</Badge>
                ),
            },
            {
                id: "name",
                accessorKey: "name",
                size: 200,
                header: () => <p className="column-title">Name</p>,
                cell: ({getValue}) => (
                    <span className="text-foreground">
            {getValue<string>()}
          </span>
                ),
            },
            {
                id: "department",
                accessorKey: "department",
                header: () => <p className="column-title">Department</p>,
                cell: ({getValue}) => (
                    <Badge variant="secondary">
                        {getValue<string>()}
                    </Badge>
                ),
            },
            {
                id: "description",
                accessorKey: "description",
                size: 300,
                header: () => <p className="column-title">Description</p>,
                cell: ({getValue}) => (
                    <span className="text-foreground">
            {getValue<string>()}
          </span>
                ),
            },
        ],
        []
    );

    const subjectTable = useTable<Subject>({
        columns,
        refineCoreProps: {
            resource: "subjects",
            pagination: {
                pageSize: 10,
                mode: "server",
            },
            filters: {
                permanent: filters,
            },
            sorters: {
                initial: [{field: "id", order: "desc"}],
            },
        },
    });

    return (
        <ListView>
            <Breadcrumb/>

            <h1 className="page-title">Subjects</h1>

            <div className="intro-row">
                <p>Quick access to essential metrics and management tools.</p>

                <div className="actions-row">
                    <div className="search-field">
                        <Search className="search-icon"/>

                        <Input
                            type="text"
                            placeholder="Search subjects..."
                            className="pl-10 w-full"
                            value={searchQuery}
                            onChange={(event) =>
                                setSearchQuery(event.target.value)
                            }
                        />
                    </div>

                    <div className="gap-2 flex w-full sm:w-auto">
                        <Select
                            value={selectedDepartment}
                            onValueChange={setSelectedDepartment}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by department"/>
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="all">
                                    All Departments
                                </SelectItem>

                                {Department_Options.map((department) => (
                                    <SelectItem
                                        key={department.value}
                                        value={department.value}
                                    >
                                        {department.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <CreateButton/>
                    </div>
                </div>
            </div>

            <DataTable table={subjectTable}/>
        </ListView>
    );
};

export default SubjectsList;
