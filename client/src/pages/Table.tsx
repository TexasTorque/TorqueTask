import Header from "../components/Header";
export default () => {
  return (
    <div className="main">
      <Header />
      <table className="main-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Asignee Subteam</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Summary</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Torque-Tasks</td>
            <td>PROGRAMMING</td>
            <td>08/22/23</td>
            <td>08/30/23</td>
            <td>Create website to organize tasks</td>
            <td>In Development</td>
          </tr>
          <tr>
            <td>Get daphne to leave </td>
            <td>PROGRAMMING</td>
            <td>08/22/23</td>
            <td>08/30/23</td>
            <td>Create website to organize tasks</td>
            <td>In Development</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
