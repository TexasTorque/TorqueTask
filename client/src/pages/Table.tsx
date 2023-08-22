import Component from "../components/Component";
import { Table } from "react-bootstrap";

export default () => {
  return (
    <table >
      <thead>
        <tr>
          <th>Column 1</th>
          <th>Column 2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Row 1 Data 1</td>
          <td>Row 1 Data 2</td>
        </tr>
      </tbody>
    </table>
  );
};
