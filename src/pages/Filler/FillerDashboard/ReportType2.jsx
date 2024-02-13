import React from 'react';
import DataTable from 'react-data-table-component';
import PercentFill from './PercentFill';

const ReportType2 = ({ milestones }) => {
  const columns = [
    { name: 'Milestone', selector: 'milestone', sortable: true },
   
    {
      name: 'Subtask',
      selector: 'subtask',
      sortable: true,
      cell: (row) => <div>{row.subtask}</div>,
    },
    {
      name: 'Progress',
      selector: 'progress',
      cell: (row) => (
        <PercentFill
          necessaryPercentage={row.necessaryPercentage}
          unnecessaryPercentage={row.unnecessaryPercentage}
        />
      ),
    },
  ];

  const data = Object.entries(milestones).reduce((acc, [milestone, milestoneData]) => {
    const subtasks = Object.entries(milestoneData.subTask).map(([subtask, percentages]) => ({
      milestone,
      deadline: milestoneData.Deadline,
      subtask,
      necessaryPercentage: percentages.necessary,
      unnecessaryPercentage: percentages.unnecessary,
    }));

    return [...acc, ...subtasks];
  }, []);

  return (
    <div>
      <DataTable title="Report Type 2" columns={columns} data={data} pagination />
    </div>
  );
};

export default ReportType2;
