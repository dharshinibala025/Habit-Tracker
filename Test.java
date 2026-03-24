import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
public class Test {
    public static class Model { public List<String> topics; }
    public static void main(String[] args) {
        try {
            new ObjectMapper().readValue(""{ "topics": "maths" }"", Model.class);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
